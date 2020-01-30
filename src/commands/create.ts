import { joinPath, getTruffleConfig } from '../utils/file_system'
import createWeb3 from '../utils/web3'

const create = async (projectDir :string) => {
    console.log("hello")
    const truffleConfigPath = joinPath(projectDir, "truffle-config.js")
    const networkConfig = getTruffleConfig(truffleConfigPath)
    console.log(networkConfig)
}

export default create
