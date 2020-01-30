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

export { createNewDir, joinPath, createNewFile, postscriptFile, getTruffleConfig, getProxyAdminPath, getProxyPath }
