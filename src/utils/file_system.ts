import fs from 'fs'
import path from 'path'
import { defaultNetwork } from '../utils/grobal_config'

const isExist = (path :string) => {
    return fs.existsSync(path) ? true : false
}

const joinPath = (prePath :string, postPath :string) => {
    return path.join(prePath, postPath)
}

const createNewDir = (path :string) => {
    if (!isExist(path)) {
        fs.mkdirSync(path)
    }
}

const createNewFile = (path :string, contents :string) => {
    if (!isExist(path)) {
        fs.appendFile(path, contents, (err) => {
            if (err) throw err
            console.log('Successful in creating file')
        })
    } else {
        console.log('File already exists')
    }
}

const createNewJsonFile = (path :string, contents :Object) => {
    if (!isExist(path)) {
        fs.appendFile(path, JSON.stringify(contents, null, '    '), (err) => {
            if (err) throw err
            console.log('Successful in creating file')
        })
    } else {
        console.log('File already exists')
    }
}

const postscriptFile = (path :string, contents :string) => {
    fs.appendFile(path, contents, (err) => {
        if (err) throw err
        console.log('Successful in creating file')
    })
}

const getTruffleConfig = (path :string) => {
    try {
        return require(path).networks
    } catch (err) {
        return defaultNetwork
    }
}

const getProxyAdminPath = () => {
    return path.join(__dirname, '..', '..', 'build', 'contracts', 'ProxyAdmin.json')
}

const getProxyPath = () => {
    return path.join(__dirname, '..', '..', 'build', 'contracts', 'Proxy.json')
}

const getDeployProjectPath = (projectDir :string) => {
    return path.join(projectDir, '.sexydynamite', 'deployed.json')
}

const getUpgradeProjectPath = (projectDir :string) => {
    return path.join(projectDir, '.sexydynamite', 'upgraded.json')
}

const getContractPath = (projectDir :string, contractName :string) => {
    return path.join(projectDir, 'build', 'contracts', `${contractName}.json`)
}

const emitDeployedProjectFile = async (projectDir :string, project :any) => {
    const projectFilePath = getDeployProjectPath(projectDir)
    const contents = {
        timestamp: project.timestamp,
        deployer: project.deployer,
        contractName: project.contractName,
        implementationAddress: project.implementationAddress,
        proxyAdminAddress: project.proxyAdminAddress,
        proxyAddress: project.proxyAddress
    }
    await createNewJsonFile(projectFilePath, contents)
}

const emitUpgradedProject = async (projectDir :string, project :any) => {
    const projectFilePath = getUpgradeProjectPath(projectDir)
    const contents = {
        timestamp: project.timestamp,
        upgradeHash: project.upgradeHash,
        deployer: project.deployer,
        contractName: project.contractName,
        implementationAddress: project.implementationAddress,
        proxyAdminAddress: project.proxyAdminAddress,
        proxyAddress: project.proxyAddress
    }
    await createNewJsonFile(projectFilePath, contents)
}

export {
    isExist,
    createNewDir,
    joinPath,
    createNewFile,
    postscriptFile,
    getTruffleConfig,
    getProxyAdminPath,
    getProxyPath,
    getDeployProjectPath,
    getContractPath,
    emitDeployedProjectFile,
    emitUpgradedProject
}
