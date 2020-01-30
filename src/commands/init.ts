
import { isExist, basedDir } from '../utils/file_system'

const initialize = () => {
    const path  = basedDir()
    const res = isExist(path)
    console.log(path)
    console.log("hello world")
}

export default initialize