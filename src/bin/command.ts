const version = require('../../package.json').version
import program from 'commander'
import initialize from '../commands/init'

const [nodePath, binPath, command] = process.argv;

program
    .version(version, '-v, --version')
    .command('init')
        .description('initialize contract manager')
        .action(() => initialize(process.cwd()))

export default program
