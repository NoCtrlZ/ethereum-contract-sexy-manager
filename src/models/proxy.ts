import { getProxyPath } from '../utils/file_system'

export default class Proxy {
    address: string

    constructor() {
        this.address = ''
    }

    json() {
        return require(getProxyPath())
    }

    abi() {
        return require(getProxyPath()).abi
    }

    setAddress(implementationAddress :string) {
        this.address = implementationAddress
    }

    self() {
        return this
    }
}
