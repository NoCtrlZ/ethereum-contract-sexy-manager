import path from 'path'
import { version, provider } from '../utils/grobal_config'
import { createNewDir, createNewFile } from '../utils/file_system'

const initialize = async (projectDir :string) => {
    await createManagerDir(projectDir)
    await createManagerFile(projectDir)
}

const createManagerDir = async (projectDir :string) => {
    const managerDirPath = path.join(projectDir, ".sexydynamite")
    await createNewDir(managerDirPath)
}

const createManagerFile = async (projectDir :string) => {
    const managerFilePath = path.join(projectDir, ".sexydynamite", ".session")
    const contents = {
        version: version,
        provider: provider
    }
    const json = JSON.stringify(contents, null, '    ')
    await createNewFile(managerFilePath, json)
}

export default initialize
