import { getProxyAdminPath } from '../utils/file_system'

export default class ProxyAdmin {
    address: string

    constructor() {
        this.address = ''
    }

    json = () => (
        require(getProxyAdminPath())
    )

    abi = () => (
        require(getProxyAdminPath()).abi
    )

    setAddress = (implementationAddress :string) => {
        this.address = implementationAddress
    }

    self = () => (
        this
    )
}
