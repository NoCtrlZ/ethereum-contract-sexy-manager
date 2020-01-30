export default class ProxyAdmin {
    path: string
    address?: string

    constructor(path :string) {
        this.path = path
    }

    json() {
        return require(this.path)
    }

    abi() {
        return require(this.path).abi
    }

    setAddress(implementationAddress :string) {
        this.address = implementationAddress
    }

    self() {
        return this
    }
}
