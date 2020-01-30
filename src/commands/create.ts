import deployImplementation from '../transactions/deploy_implementation'

const create = async (projectDir :string) => {
    deployImplementation(projectDir)
}

export default create
