import deployImplementation from '../transactions/deploy_implementation'
import deployProxyAdmin from '../transactions/deploy_proxyadmin'

const create = async (projectDir :string) => {
    let implementation = await deployImplementation(projectDir)
    console.log(implementation)
    let proxyAdmin = await deployProxyAdmin(projectDir)
    console.log(implementation)
    console.log(proxyAdmin)
}

export default create
