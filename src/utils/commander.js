import { Command } from 'commander'
import { logger } from '../config/logger.js'

const commander = new Command()

commander
    .option('-d', 'Debug variable', false)
    .option('-p, --port <port>', 'Set port', 8080)
    .option('--mode <mode>', 'Server mode', 'development')
    .requiredOption('-u <user>', 'Current user', 'No user declared')
    .parse()

export default commander

logger.debug(JSON.stringify(commander.opts(), null, 0))