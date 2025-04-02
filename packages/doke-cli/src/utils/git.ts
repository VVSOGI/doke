import chalk from 'chalk'
import spawn from 'cross-spawn'

const REPO_URL = 'https://github.com/VVSOGI/doke'
const FOLDER_PATH = '/packages/doke-ui'

export class GitCommand {
  static checkGitExists = (): boolean => {
    try {
      const result = spawn.sync('git', ['--version'], { stdio: 'ignore' })
      return result.status === 0
    } catch (error) {
      return false
    }
  }

  static cloneUIRepository = () => {
    if (!GitCommand.checkGitExists()) {
      console.error(chalk.red('Git is not installed. Please install Git and try again.'))
      process.exit(1)
    }

    console.log(chalk.blue(`Cloning folder ${FOLDER_PATH} from ${REPO_URL}`))
  }
}
