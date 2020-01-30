import deploy from '../transactions/deploy'

const create = async (projectDir :string) => {
    deploy(projectDir)
}

export default create
