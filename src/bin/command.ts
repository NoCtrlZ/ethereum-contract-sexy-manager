#!/usr/bin/env node

/**
 * Module dependencies.
 */

const version = require('../../package.json').version
import program from 'commander'
import initialize from '../commands/init'

program
    .version(version, '-v, --version')

program.command('init')
        .description('initialize contract manager')
        .action(() => initialize())

program.parse(process.argv)
export default program
