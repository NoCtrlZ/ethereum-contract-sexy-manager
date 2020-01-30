import fs from 'fs'

const isExist = (path :string) => {
    return fs.existsSync(path) ? true : false
}

const createNewDir = (path :string) => {
    if (!isExist(path)) {
        fs.mkdirSync(path)
    }
}

export { isExist, createNewDir }
