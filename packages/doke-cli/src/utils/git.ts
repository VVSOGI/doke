import chalk from 'chalk'
import spawn from 'cross-spawn'
import path from 'path'
import fs from 'fs-extra'

export class GitCommand {
  private REPO_URL: string = 'https://github.com/VVSOGI/doke'
  private FOLDER_PATH: string = '/packages/doke-ui'
  private TARGET_DIR: string = 'doke-ui'

  constructor() {
    if (!this.checkGitExists()) {
      console.error(chalk.red('Git is not installed. Please install Git and try again.'))
      process.exit(1)
    }
  }

  private checkGitExists = (): boolean => {
    try {
      const result = spawn.sync('git', ['--version'], { stdio: 'ignore' })
      return result.status === 0
    } catch (error) {
      return false
    }
  }

  private runCommand = (command: string, args: string[], cwd: string): boolean => {
    const result = spawn.sync(command, args, { cwd: cwd, stdio: 'ignore' })
    return result.status === 0
  }

  public cloneUIRepository = async () => {
    try {
      const targetDirectory = path.join(process.cwd(), this.TARGET_DIR)

      if (fs.existsSync(targetDirectory)) {
        console.log(chalk.yellow(`Target directory ${this.TARGET_DIR} already exists. Removing...`))
        fs.removeSync(targetDirectory)
      }

      fs.ensureDirSync(targetDirectory)
      console.log(chalk.blue(`Cloning folder ${this.FOLDER_PATH} from ${this.REPO_URL}`))

      if (!this.runCommand('git', ['init'], targetDirectory)) {
        throw new Error('Failed to initialize git repository')
      }

      if (!this.runCommand('git', ['remote', 'add', 'origin', this.REPO_URL], targetDirectory)) {
        throw new Error('Failed to add remote origin')
      }

      if (!this.runCommand('git', ['checkout', '-b', 'main'], targetDirectory)) {
        throw new Error('Failed to change branch')
      }

      if (!this.runCommand('git', ['config', 'core.sparseCheckout', 'true'], targetDirectory)) {
        throw new Error('Failed to enable sparse checkout')
      }

      fs.writeFileSync(path.join(targetDirectory, '.git', 'info', 'sparse-checkout'), this.TARGET_DIR)

      if (!this.runCommand('git', ['pull', 'origin', 'main'], targetDirectory)) {
        throw new Error('Failed to pull from repository')
      }

      const packagesPath = path.join(targetDirectory, this.FOLDER_PATH)
      if (fs.existsSync(packagesPath)) {
        const files = fs.readdirSync(packagesPath)

        files.forEach((file) => {
          const sourcePath = path.join(packagesPath, file)
          const destPath = path.join(targetDirectory, file)
          fs.moveSync(sourcePath, destPath, { overwrite: true })
        })

        fs.removeSync(path.join(targetDirectory, 'packages'))
      }

      const gitDir = path.join(targetDirectory, '.git')
      if (fs.existsSync(gitDir)) {
        fs.removeSync(gitDir)
      }

      console.log(chalk.blue(`Install packages that need doke-ui`))

      if (!this.runCommand('yarn', ['install'], targetDirectory)) {
        throw new Error('Failed to install dependencies')
      }

      console.log(chalk.blue(`Build complete files`))
      if (!this.runCommand('yarn', ['build'], targetDirectory)) {
        throw new Error('Failed to build the package')
      }

      if (!this.runCommand('git', ['init'], targetDirectory)) {
        throw new Error('Failed to initialize a new Git repository')
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`))
      process.exit(1)
    }
  }
}
