import { isExist, getDeployProjectPath } from '../utils/file_system'
import upgradeImplementation from '../transactions/upgrade'

const upgrade = async (projectDir :string, contractName :string) => {
    if (isImplementationExist(projectDir)) {
        upgradeImplementation(projectDir, contractName)
    } else {
        console.log(`You haven't deploy implementation yet`)
    }
}

const isImplementationExist = (projectDir :string) => (
    isExist(getDeployProjectPath(projectDir))
)

export default upgrade
