import chalk from 'chalk'
import { CommandExecutor } from '../common'

export class PackageBuildManager {
  private commandExecuter: CommandExecutor
  private targetDirectory: string

  constructor(targetDirectory: string) {
    this.commandExecuter = new CommandExecutor()
    this.targetDirectory = targetDirectory
  }

  public installPackages = async () => {
    console.log(chalk.blue(`Install packages that need doke-ui`))
    if (!this.commandExecuter.runCommand('yarn', ['install'], this.targetDirectory)) {
      throw new Error('Failed to install dependencies')
    }
  }

  public build = async () => {
    console.log(chalk.blue(`Build installed files`))
    if (!this.commandExecuter.runCommand('yarn', ['build'], this.targetDirectory)) {
      throw new Error('Failed to build the package')
    }
  }
}
