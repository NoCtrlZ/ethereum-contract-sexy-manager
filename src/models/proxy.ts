import { getProxyPath } from '../utils/file_system'

export default class Proxy {
    address: string

    constructor() {
        this.address = ''
    }

    json = () => (
        require(getProxyPath())
    )

    abi = () => (
        require(getProxyPath()).abi
    )

    setAddress = (implementationAddress :string) => {
        this.address = implementationAddress
    }

    self = () => (
        this
    )
}
