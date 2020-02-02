import { getDeployJson } from '../utils/file_system'

export default class Upgrader {
    deployer: string
    proxyAdminAddress: string
    proxyAddress: string

    constructor(path :string) {
        const upgradeConfig = getDeployJson(path)
        this.deployer = upgradeConfig.deployer
        this.proxyAdminAddress = upgradeConfig.proxyAdminAddress
        this.proxyAddress = upgradeConfig.proxyAddress
    }

    self = () => (
        this
    )
}
