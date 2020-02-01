import { currentTime } from '../utils/utilities'

export default class Component {
    timestamp: string
    deployer: string
    contractName: string
    implementationAddress?: string
    proxyAdminAddress?: string
    proxyAddress?: string

    constructor(contractName :string) {
        this.timestamp = currentTime()
        this.deployer = '0x17a4dc4af1faf9c3db0515a170491c37eb0373dc'
        this.contractName = contractName
    }

    setImplementationAddress(implementationAddress :string) {
        this.implementationAddress = implementationAddress
    }

    setProxyAdminAddress(proxyAdminAddress :string) {
        this.proxyAdminAddress = proxyAdminAddress
    }

    setProxyAddress(proxyAddress :string) {
        this.proxyAddress = proxyAddress
    }

    self() {
        return this
    }
}
