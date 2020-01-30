import path from 'path'
import Implementation from '../models/implementation'
import ProxyAdmin from '../models/proxyAdmin'
import Proxy from '../models/proxy'
import { getProxyAdminPath, getProxyPath } from '../utils/file_system'
import createWeb3 from '../utils/web3'

const deploy = async (projectDir :string) => {
    const web3 = createWeb3(projectDir)
    const implementation = createImplementationInstance(projectDir)
    const Implementation = new web3.eth.Contract(implementation.abi())
    try {
        await Implementation.deploy({
            data: implementation.json().bytecode
        })
        .send({
            from: '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc',
            gas: 1500000,
            gasPrice: '30000000000'
        })
        .on('receipt', (receipt) => {
            console.log(String(receipt.contractAddress))
            implementation.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return implementation.self()
    }

    const proxyAdmin = createProxyAdminInstance(projectDir)
    const ProxyAdmin = new web3.eth.Contract(proxyAdmin.abi())
    try {
        await ProxyAdmin.deploy({
            data: proxyAdmin.json().bytecode
        })
        .send({
            from: '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc',
            gas: 1500000,
            gasPrice: '30000000000'
        })
        .on('receipt', (receipt) => {
            console.log(String(receipt.contractAddress))
            proxyAdmin.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return proxyAdmin.self()
    }

    const proxy = createProxyInstance(projectDir)
    const Proxy = new web3.eth.Contract(proxy.abi())
    let name = 'add'
    let types = [ 'uint8', 'uint8' ]
    let data = [ 3, 5 ]
    let encodedParams = web3.eth.abi.encodeParameters(types, data).substring(2);
    let functionHash = String(web3.utils.sha3(`${name}(${types.join(',')})`)).substring(2, 10);
    let encodedTransaction = `0x${functionHash}${encodedParams}`
    try {
        await Proxy.deploy({
            data: proxy.json().bytecode,
            arguments: [implementation.address, proxyAdmin.address, encodedTransaction]
        })
        .send({
            from: '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc',
            gas: 1500000,
            gasPrice: '30000000000'
        })
        .on('receipt', (receipt) => {
            console.log(String(receipt.contractAddress))
            proxy.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return proxy.self()
    }
}

const createImplementationInstance = (projectDir :string) => {
    const implementationPath = path.join(projectDir, 'build', 'contracts', 'Sample1.json')
    return new Implementation(implementationPath)
}

const createProxyAdminInstance = (projectDir :string) => {
    const proxyAdminPath = getProxyAdminPath()
    return new ProxyAdmin(proxyAdminPath)
}

const createProxyInstance = (projectDir :string) => {
    const proxyPath = getProxyPath()
    return new Proxy(proxyPath)
}

export default deploy
