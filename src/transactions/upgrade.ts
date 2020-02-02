import Implementation from '../models/implementation'
import ProxyAdmin from '../models/proxyAdmin'
import Component from '../models/component'
import createWeb3 from '../utils/web3'
import { getContractPath, emitUpgradedProject } from '../utils/file_system'
import { defaultTxParams, proxyAdminAddress, proxyAddress } from '../utils/grobal_config'


const upgradeImplementation = async (projectDir :string, contractName :string) => {
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
    const ProxyAdmin = new web3.eth.Contract(proxyAdmin.abi(), proxyAdminAddress)
    try {
        await ProxyAdmin.methods.upgradeImplementation(proxyAddress, implementation.address)
        .send(defaultTxParams)
        .on('receipt', (receipt) => {
            console.log('successful in upgrading')
            console.log(receipt.transactionHash)
            component.setUpgradeHash(receipt.transactionHash)
        })
    } catch (err) {
        console.log(err)
        return implementation.self()
    }
    await component.setProxyAddress(proxyAddress)
    await component.setProxyAdminAddress(proxyAdminAddress)
    emitUpgradedProject(projectDir, component.self())
}

const createImplementationInstance = (projectDir :string, contractName :string) => {
    const implementationPath = getContractPath(projectDir, contractName)
    return new Implementation(implementationPath)
}

const createProxyAdminInstance = () => {
    return new ProxyAdmin()
}

export default upgradeImplementation
