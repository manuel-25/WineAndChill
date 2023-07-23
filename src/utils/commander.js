import { Command } from 'commander'

const commander = new Command()

commander
    .option('-d', 'Debug variable', false)
    .option('-p, --port <port>', 'Set port', 8000)
    .option('--mode <mode>', 'Server mode', 'development')
    .requiredOption('-u <user>', 'Current user', 'No user declared')
    .parse()

export default commander

console.log(commander.opts())