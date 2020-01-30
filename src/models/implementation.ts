export default class Implementation {
    path: string
    address: string

    constructor(path :string) {
        this.path = path
        this.address = ''
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
