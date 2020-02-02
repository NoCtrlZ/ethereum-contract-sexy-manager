import { getProxyAdminPath } from '../utils/file_system'

export default class ProxyAdmin {
    address: string

    constructor() {
        this.address = ''
    }

    json() {
        return require(getProxyAdminPath())
    }

    abi() {
        return require(getProxyAdminPath()).abi
    }

    setAddress(implementationAddress :string) {
        this.address = implementationAddress
    }

    self() {
        return this
    }
}
