import Proxy from '../models/proxy'
import { getProxyPath } from '../utils/file_system'
import createWeb3 from '../utils/web3'

const deployProxy = async (projectDir :string, implementationAddress :string, proxyAdminAddress :string) => {
    const web3 = createWeb3(projectDir)
    const proxyPath = getProxyPath()
    const proxy = new Proxy(proxyPath)
    const proxyJson = proxy.json()
    const Admin = new web3.eth.Contract(proxyJson.abi)
    const encodedParams = await encodeParams(proxyAdminAddress, web3)
    try {
        await Admin.deploy({
            data: proxyJson.bytecode,
            arguments: [implementationAddress, proxyAdminAddress, encodedParams]
        })
        .send({
            from: '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc',
            gas: 1500000,
            gasPrice: '30000000000'
        })
        .on('receipt', (receipt) => {
            proxy.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return proxy.self()
    }
    return proxy.self()
}

const encodeParams = (proxyAdminAddress :string, web3 :any) => {
    let name = 'add'
    let types = [ 'uint8', 'uint8' ]
    let data = [ 3, 5 ]
    let encodedParams = web3.eth.abi.encodeParameters(types, data).substring(2);
    console.log(`${name}(${types.join(',')})`)
    let functionHash = web3.utils.sha3(`${name}(${types.join(',')})`).substring(2, 10);
    return `0x${functionHash}${encodedParams}`
}

export default deployProxy
