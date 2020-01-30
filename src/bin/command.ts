const version = require('../../package.json').version
import program from 'commander'
import initialize from '../commands/init'

const [nodePath, binPath, command] = process.argv;
console.log(process.argv)
console.log([nodePath, binPath, command])

program
    .version(version, '-v, --version')
    .command('init')
        .description('initialize contract manager')
        .action(() => initialize())

export default program
