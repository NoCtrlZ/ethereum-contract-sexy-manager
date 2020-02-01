import deploy from '../transactions/deploy'

const create = async (projectDir :string, contractName :string) => {
    deploy(projectDir, contractName)
}

export default create
