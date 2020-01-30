import fs from 'fs'
import path from 'path'

const isExist = (path :string) => {
    return fs.existsSync(path) ? true : false
}

const basedDir = () => {
    return path.join(path.dirname(fs.realpathSync(__filename)), '..')
}

const managerDir = () => {
    return path.join(path.dirname(fs.realpathSync(__filename)), '../')
}

export { isExist, basedDir }
