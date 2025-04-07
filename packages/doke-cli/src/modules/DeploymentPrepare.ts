import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { CommandExecutor } from '../common'
import { fork } from 'child_process'

export class DeploymentPrepare {
  private targetDirectory: string
  private commandExecutor: CommandExecutor

  constructor(targetDirectory: string) {
    this.targetDirectory = targetDirectory
    this.commandExecutor = new CommandExecutor()
  }

  private isDockerInstalled = () => {
    try {
      const isWindows = process.platform === 'win32'
      const command = isWindows ? 'where' : 'which'

      const result = this.commandExecutor.runCommand(command, ['docker'], this.targetDirectory)
      return result
    } catch (error) {
      return false
    }
  }

  public localStart = () => {
    const target = path.join(this.targetDirectory, 'server.js')
    fork(target, {
      env: {
        PORT: '3001'
      },
      stdio: 'inherit'
    })
  }

  public localDeployment = async () => {
    const items = await fs.readdir(this.targetDirectory)
    const excludes = ['.next']

    for (const item of items) {
      if (excludes.includes(item)) {
        continue
      }

      const itemPath = path.join(this.targetDirectory, item)
      await fs.remove(itemPath)
    }

    const nextOriginalPath = path.join(this.targetDirectory, '.next')
    const nextBackupPath = path.join(this.targetDirectory, '.next_original')
    if (fs.existsSync(nextOriginalPath)) await fs.move(nextOriginalPath, nextBackupPath)

    const standalonePath = path.join(nextBackupPath, 'standalone')
    const standaloneFiles = await fs.readdir(standalonePath)
    for (const file of standaloneFiles) {
      const sourcePath = path.join(standalonePath, file)
      const destPath = path.join(this.targetDirectory, file)
      if (fs.existsSync(destPath)) await fs.remove(destPath)
      await fs.move(sourcePath, destPath)
    }

    if (fs.existsSync(nextBackupPath)) {
      const staticFiles = path.join(nextBackupPath, 'static')
      const dest = path.join(this.targetDirectory, '.next', 'static')
      fs.moveSync(staticFiles, dest)
      fs.removeSync(nextBackupPath)
    }
  }

  public dockerDeployment = async () => {
    console.log(chalk.blue(`Building Docker image: doke-ui`))
    if (!this.isDockerInstalled()) {
      throw new Error('Docker is not installed. Please install Docker to continue.')
    }

    if (!this.commandExecutor.runCommand('docker', ['build', '-t', `doke-ui`, '.'], this.targetDirectory, true)) {
      throw new Error('Failed to build docker images')
    }

    await fs.remove(this.targetDirectory)
  }
}
