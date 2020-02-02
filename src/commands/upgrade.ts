import { isExist, getProjectPath } from '../utils/file_system'
import upgradeImplementation from '../transactions/upgrade'

const upgrade = async (projectDir :string, contractName :string) => {
    console.log(projectDir, contractName)
    console.log(isImplementationExist(projectDir))
    if (isImplementationExist(projectDir)) {
        upgradeImplementation(projectDir, contractName)
    } else {
        console.log(`You haven't deploy implementation yet`)
    }
}

const isImplementationExist = (projectDir :string) => {
    return isExist(getProjectPath(projectDir))
}

export default upgrade
