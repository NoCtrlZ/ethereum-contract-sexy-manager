import fs from 'fs'

const isExist = (path :string) => {
    return fs.existsSync(path) ? true : false
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
    }
}

export { isExist, createNewDir, createNewFile }
