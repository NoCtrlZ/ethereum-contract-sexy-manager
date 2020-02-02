import { version } from '../utils/grobal_config'
import program from 'commander'
import initialize from '../commands/init'
import create from '../commands/create'
import upgrade from '../commands/upgrade'

const [nodePath, binPath, command] = process.argv;

program
    .version(version, '-v, --version')
    .command('init')
        .description('initialize contract manager')
        .action(() => initialize(process.cwd()));
program
        .command('create')
        .description('deploy contract manager')
        .requiredOption('-c, --contract <type>', 'add the contract name you want to deploy', 'Sample')
        .action(options => {
                create(process.cwd(), options.parent.rawArgs[4])
        });
program
        .command('upgrade')
        .description('upgrade implementation')
        .requiredOption('-c, --contract <type>', 'add the contract name you want to deploy', 'Sample')
        .action(options => {
                upgrade(process.cwd(), options.parent.rawArgs[4])
        });


export default program
