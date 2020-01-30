import { joinPath, getTruffleConfig } from './file_system'
import Web3 from 'web3'

const createWeb3 = (projectDir :string) => {
    const truffleConfigPath = joinPath(projectDir, 'truffle-config.js')
    const networkConfig = getTruffleConfig(truffleConfigPath)
    // Todo support all kind of networks
    const protocol = (networkConfig.development.host == '127.0.0.1' || networkConfig.development.host == 'localhost') ? 'http' : 'https'
    const port = (protocol == 'http') ? ':' + networkConfig.development.port : ''
    const endpoint = `${protocol}://${networkConfig.development.host}${port}`
    return new Web3(new Web3.providers.HttpProvider(endpoint))
}

export default createWeb3
