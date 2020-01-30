import path from 'path'
import { createNewDir } from '../utils/file_system'

const initialize = (projectDir :string) => {
    createManagerDir(projectDir)
}

const createManagerDir = (projectDir :string) => {
    const managerDir = path.join(projectDir, ".sexydynamite")
    createNewDir(managerDir)
}

export default initialize
