import path from 'path'
import { version, provider } from '../utils/grobal_config'
import { joinPath, createNewDir, createNewFile, postscriptFile } from '../utils/file_system'

const initialize = async (projectDir :string) => {
    await createManagerDir(projectDir)
    await createManagerFile(projectDir)
    await addGitIgnore(projectDir)
}

const createManagerDir = async (projectDir :string) => {
    const managerDirPath = joinPath(projectDir, ".sexydynamite")
    await createNewDir(managerDirPath)
}

const createManagerFile = async (projectDir :string) => {
    const managerFilePath = path.join(projectDir, ".sexydynamite", ".session")
    const contents = {
        version: version,
        provider: provider,
        owner_address: '',
        owner_private_key: ''
    }
    const json = JSON.stringify(contents, null, '    ')
    await createNewFile(managerFilePath, json)
}

const addGitIgnore = async (projectDir :string) => {
    const gitIgnorePath = joinPath(projectDir, ".gitignore")
    const content = "\n.sexydynamite/.session"
    await postscriptFile(gitIgnorePath, content)
}

export default initialize
