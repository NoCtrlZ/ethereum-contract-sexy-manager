import deployImplementation from '../transactions/deploy_implementation'
import deployProxyAdmin from '../transactions/deploy_proxyadmin'
import deployProxy from '../transactions/deploy_proxy'

const create = async (projectDir :string) => {
    let implementation = await deployImplementation(projectDir)
    console.log(implementation)
    let proxyAdmin = await deployProxyAdmin(projectDir)
    console.log(proxyAdmin)
    let proxy = await deployProxy(projectDir, implementation.address, proxyAdmin.address)
    console.log(proxy)
}

export default create
