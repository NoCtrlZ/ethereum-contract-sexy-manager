import deployImplementation from '../transactions/deploy_implementation'
import path from 'path'
import Implementation from '../models/implementation'

const create = async (projectDir :string) => {
    deployImplementation(projectDir)
    const implementationPath = path.join(projectDir, 'build', 'constracts', 'Sample1')
    let implementation = new Implementation(implementationPath)
    console.log(implementation)
}

export default create
