import ProxyAdmin from '../models/proxyAdmin'
import { getProxyAdminPath } from '../utils/file_system'
import createWeb3 from '../utils/web3'

const deployProxyAdmin = async (projectDir :string) => {
    const web3 = createWeb3(projectDir)
    const proxyAdminPath = getProxyAdminPath()
    const proxyAdmin = new ProxyAdmin(proxyAdminPath)
    const proxyAdminJson = proxyAdmin.json()
    const Admin = new web3.eth.Contract(proxyAdminJson.abi)
    try {
        await Admin.deploy({
            data: proxyAdminJson.bytecode
        })
        .send({
            from: '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc',
            gas: 1500000,
            gasPrice: '30000000000'
        })
        .on('receipt', (receipt) => {
            proxyAdmin.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return proxyAdmin.self()
    }
    return proxyAdmin.self()
}

export default deployProxyAdmin
