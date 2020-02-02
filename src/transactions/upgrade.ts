import Implementation from '../models/implementation'
import ProxyAdmin from '../models/proxyAdmin'
import Component from '../models/component'
import createWeb3 from '../utils/web3'
import Upgrader from '../models/upgrader'
import { getContractPath, emitUpgradedProject } from '../utils/file_system'
import { defaultTxParams } from '../utils/grobal_config'


const upgradeImplementation = async (projectDir :string, contractName :string) => {
    let component = new Component(contractName)
    let upgrader = new Upgrader(projectDir)
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
    const ProxyAdmin = new web3.eth.Contract(proxyAdmin.abi(), upgrader.proxyAdminAddress)
    try {
        await ProxyAdmin.methods.upgradeImplementation(upgrader.proxyAddress, implementation.address)
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
    await component.setProxyAddress(upgrader.proxyAddress)
    await component.setProxyAdminAddress(upgrader.proxyAdminAddress)
    emitUpgradedProject(projectDir, component.self())
}

const createImplementationInstance = (projectDir :string, contractName :string) => {
    const implementationPath = getContractPath(projectDir, contractName)
    return new Implementation(implementationPath)
}

const createProxyAdminInstance = () => (
    new ProxyAdmin()
)

export default upgradeImplementation
