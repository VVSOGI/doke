import chalk from 'chalk'
import spawn from 'cross-spawn'
import path from 'path'
import fs from 'fs-extra'
import { CommandExecutor } from '../common'
import { CONSTANTS } from '../constants'

export class GitRepositorySetup {
  private REPO_URL: string = CONSTANTS.GITHUB.REPO_URL
  private FOLDER_PATH: string = CONSTANTS.GITHUB.UI_PATH
  private targetDirectory: string
  private commandExecuter: CommandExecutor

  constructor(targetDirecotry: string) {
    if (!this.checkGitExists()) {
      console.error(chalk.red('Git is not installed. Please install Git and try again.'))
      process.exit(1)
    }
    this.commandExecuter = new CommandExecutor()
    this.targetDirectory = targetDirecotry
  }

  private checkGitExists = (): boolean => {
    try {
      const result = spawn.sync('git', ['--version'], { stdio: 'ignore' })
      return result.status === 0
    } catch (error) {
      return false
    }
  }

  public gitIntialize = () => {
    if (!this.commandExecuter.runCommand('git', ['init'], this.targetDirectory)) {
      throw new Error('Failed to initialize a new Git repository')
    }
  }

  public gitInitDelete = () => {
    const gitDir = path.join(this.targetDirectory, '.git')
    if (fs.existsSync(gitDir)) {
      fs.removeSync(gitDir)
    }
  }

  public cloneUIRepository = async () => {
    if (fs.existsSync(this.targetDirectory)) {
      console.log(chalk.yellow(`Target directory ${this.targetDirectory} already exists. Removing...`))
      fs.removeSync(this.targetDirectory)
    }

    fs.ensureDirSync(this.targetDirectory)

    console.log(chalk.blue(`Cloning folder ${this.FOLDER_PATH} from ${this.REPO_URL}`))
    this.gitIntialize()

    if (!this.commandExecuter.runCommand('git', ['remote', 'add', 'origin', this.REPO_URL], this.targetDirectory)) {
      throw new Error('Failed to add remote origin')
    }

    if (!this.commandExecuter.runCommand('git', ['checkout', '-b', 'main'], this.targetDirectory)) {
      throw new Error('Failed to change branch')
    }

    if (!this.commandExecuter.runCommand('git', ['config', 'core.sparseCheckout', 'true'], this.targetDirectory)) {
      throw new Error('Failed to enable sparse checkout')
    }
    const sparseCheckoutDir = path.join(this.targetDirectory, '.git', 'info')
    fs.writeFileSync(path.join(this.targetDirectory, '.git', 'info', 'sparse-checkout'), this.targetDirectory)
    fs.writeFileSync(path.join(sparseCheckoutDir, 'sparse-checkout'), this.FOLDER_PATH)

    if (!this.commandExecuter.runCommand('git', ['pull', 'origin', 'main'], this.targetDirectory)) {
      throw new Error('Failed to pull from repository')
    }

    const packagesPath = path.join(this.targetDirectory, this.FOLDER_PATH)
    if (fs.existsSync(packagesPath)) {
      const files = fs.readdirSync(packagesPath)

      files.forEach((file) => {
        const sourcePath = path.join(packagesPath, file)
        const destPath = path.join(this.targetDirectory, file)
        fs.moveSync(sourcePath, destPath, { overwrite: true })
      })

      fs.removeSync(path.join(this.targetDirectory, 'packages'))
    }
  }
}
