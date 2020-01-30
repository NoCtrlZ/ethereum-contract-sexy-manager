import { version } from '../utils/grobal_config'
import program from 'commander'
import initialize from '../commands/init'
import create from '../commands/create'

const [nodePath, binPath, command] = process.argv;

program
    .version(version, '-v, --version')
    .command('init')
        .description('initialize contract manager')
        .action(() => initialize(process.cwd()))
program
        .command('create')
        .description('deploy contract manager')
        .action(() => create(process.cwd()))

export default program
