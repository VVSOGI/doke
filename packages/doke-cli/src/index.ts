import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import { Command } from 'commander'
import { DeploymentPrepare, GitRepositorySetup, PackageBuildManager, SelectCommand } from './modules'
import { CONSTANTS } from './constants'

const program = new Command()

program.name('doke-cli').version('1.0.0', '-v, --version').description('Create relative doke just in time')

program
  .command('create-ui')
  .description('Create doke ui just-in-time')
  .action(async () => {
    if (!fs.existsSync('api-docs')) {
      console.error(`Not exist api-docs folder in current path`)
      process.exit(1)
    }

    console.log(chalk.blue('Create doke ui'))
    const targetDirectory = path.join(process.cwd(), CONSTANTS.DIRECTORY.TARGET)
    const environment = await SelectCommand.chooseEnvironment()
    const gitRepositorySetup = new GitRepositorySetup(targetDirectory)
    const packageBuildManager = new PackageBuildManager(targetDirectory)
    const deploymentPrepare = new DeploymentPrepare(targetDirectory)

    const targetApiDocs = path.join(targetDirectory, '/api-docs')
    const sourceApiDocs = path.join(process.cwd(), '/api-docs')

    try {
      await gitRepositorySetup.cloneUIRepository()
      fs.removeSync(targetApiDocs)
      fs.moveSync(sourceApiDocs, targetApiDocs)
      gitRepositorySetup.gitInitDelete()

      if (environment === 'local') {
        await packageBuildManager.installPackages()
        await packageBuildManager.build()
        await deploymentPrepare.localDeployment()
        gitRepositorySetup.gitIntialize()
        console.log(chalk.blue('Set to local environment.'))
      } else {
        await deploymentPrepare.dockerDeployment()
        console.log(chalk.blue('Set to docker environment.'))
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`))
      process.exit(1)
    }

    console.log(chalk.green(`✅ A doke ui has been created at. ${targetDirectory}.`))
  })

program.parse(process.argv)
