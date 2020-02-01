import path from 'path'
import Implementation from '../models/implementation'
import ProxyAdmin from '../models/proxyAdmin'
import Proxy from '../models/proxy'
import Component from '../models/component'
import { getProxyAdminPath, getProxyPath, emitProjectFile } from '../utils/file_system'
import { defaultTxParams } from '../utils/grobal_config'
import createWeb3 from '../utils/web3'

const deploy = async (projectDir :string, contractName :string) => {
    let component = new Component(contractName)
    const web3 = createWeb3(projectDir)
    const implementation = createImplementationInstance(projectDir, contractName)
    const Implementation = new web3.eth.Contract(implementation.abi())
    try {
        await Implementation.deploy({
            data: implementation.json().bytecode
        })
        .send(defaultTxParams)
        .on('receipt', (receipt) => {
            console.log(String(receipt.contractAddress))
            implementation.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return implementation.self()
    }
    await component.setImplementationAddress(implementation.address)

    const proxyAdmin = createProxyAdminInstance()
    const ProxyAdmin = new web3.eth.Contract(proxyAdmin.abi())
    try {
        await ProxyAdmin.deploy({
            data: proxyAdmin.json().bytecode
        })
        .send(defaultTxParams)
        .on('receipt', (receipt) => {
            console.log(String(receipt.contractAddress))
            proxyAdmin.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return proxyAdmin.self()
    }
    await component.setProxyAdminAddress(proxyAdmin.address)

    const proxy = createProxyInstance()
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
        .send(defaultTxParams)
        .on('receipt', (receipt) => {
            console.log(String(receipt.contractAddress))
            proxy.setAddress(String(receipt.contractAddress))
        })
    } catch (err) {
        console.log(err)
        return proxy.self()
    }
    await component.setProxyAddress(proxy.address)
    emitProjectFile(projectDir, component.self())
}

const createImplementationInstance = (projectDir :string, contractName :string) => {
    const implementationPath = path.join(projectDir, 'build', 'contracts', `${contractName}.json`)
    return new Implementation(implementationPath)
}

const createProxyAdminInstance = () => {
    const proxyAdminPath = getProxyAdminPath()
    return new ProxyAdmin(proxyAdminPath)
}

const createProxyInstance = () => {
    const proxyPath = getProxyPath()
    return new Proxy(proxyPath)
}

export default deploy
