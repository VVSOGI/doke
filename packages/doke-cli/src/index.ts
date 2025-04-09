import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra'
import { Command } from 'commander'
import { DeploymentPrepare, GitRepositorySetup, PackageBuildManager, SelectCommand } from './modules'
import { CONSTANTS } from './constants'

const program = new Command()

program.name('doke-cli').version('1.0.0', '-v, --version').description('generate relative doke just in time')

program
  .command('start')
  .description('Start ui that doke api documnet')
  .action(async () => {
    if (!fs.existsSync('doke-ui')) {
      console.error(chalk.red(`Not exist doke ui folder in current path`))
      process.exit(1)
    }
    const targetDirectory = path.join(process.cwd(), CONSTANTS.DIRECTORY.TARGET)
    const deploymentPrepare = new DeploymentPrepare(targetDirectory)

    deploymentPrepare.localStart()
  })

program
  .command('generate-ui')
  .description('generate doke ui just-in-time')
  .action(async () => {
    if (!fs.existsSync('api-docs')) {
      console.error(chalk.red(`Not exist api-docs folder in current path`))
      process.exit(1)
    }

    console.log(chalk.blue('generate doke ui'))
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
      fs.copySync(sourceApiDocs, targetApiDocs)
      gitRepositorySetup.gitInitDelete()

      if (environment === 'local') {
        await packageBuildManager.installPackages()
        await packageBuildManager.build()
        await deploymentPrepare.localDeployment()
        gitRepositorySetup.gitIntialize()
        deploymentPrepare.localStart()
        console.log(chalk.blue('Set to local environment.'))
      } else {
        await deploymentPrepare.dockerDeployment()
        console.log(chalk.blue('Set to docker environment.'))
      }
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`))
      process.exit(1)
    }

    console.log(chalk.green(`✅ A doke ui has been generated at. ${targetDirectory}.`))
  })

program.parse(process.argv)
