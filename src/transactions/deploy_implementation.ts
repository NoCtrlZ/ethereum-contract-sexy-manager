import path from 'path'
import Implementation from '../models/implementation'
import createWeb3 from '../utils/web3'

const deployImplementation = async (projectDir :string) => {
    const web3 = createWeb3(projectDir)
    const implementationPath = path.join(projectDir, 'build', 'contracts', 'Sample1.json')
    let implementation = new Implementation(implementationPath)
    let implementationJson = implementation.json()
    const Contract = new web3.eth.Contract(implementationJson.abi)
    try {
        await Contract.deploy({
            data: implementationJson.bytecode
        })
        .send({
            from: '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc',
            gas: 1500000,
            gasPrice: '30000000000'
        })
        .on('receipt', (receipt) => {
            implementation.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return false
    }
    return implementation.self()
}

export default deployImplementation