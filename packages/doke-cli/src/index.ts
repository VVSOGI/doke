import chalk from 'chalk'
import { Command } from 'commander'
import { GitRepositorySetup, SelectCommand } from './modules'

const program = new Command()

program.name('doke-cli').version('1.0.0', '-v, --version').description('Create relative doke just in time')

program
  .command('create-ui')
  .description('Create doke ui just-in-time')
  .action(async () => {
    console.log(chalk.blue('Create doke ui'))
    const environment = await SelectCommand.chooseEnvironment()
    const gitCommand = new GitRepositorySetup()
    gitCommand.cloneUIRepository()

    if (environment === 'local') {
      console.log(chalk.blue('Set to local environment.'))
    } else {
      console.log(chalk.blue('Set to docker environment.'))
    }

    console.log(chalk.green('✅ doke ui가. /path/you/want 에 생성되었습니다.'))
  })

program.parse(process.argv)
