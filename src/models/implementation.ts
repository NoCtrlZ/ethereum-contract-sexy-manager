export default class Implementation {
    path: string
    address: string

    constructor(path :string) {
        this.path = path
        this.address = ''
    }

    json = () => (
        require(this.path)
    )

    abi = () => (
        require(this.path).abi
    )

    setAddress = (implementationAddress :string) => {
        this.address = implementationAddress
    }

    self = () => (
        this
    )
}
