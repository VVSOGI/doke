import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { CommandExecutor } from '../common'

export class DeploymentPrepare {
  private targetDirectory: string
  private commandExecutor: CommandExecutor

  constructor(targetDirectory: string) {
    this.targetDirectory = targetDirectory
    this.commandExecutor = new CommandExecutor()
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

    const nextBackupPath = path.join(this.targetDirectory, '.next_original')
    if (fs.existsSync(path.join(this.targetDirectory, '.next'))) {
      await fs.move(path.join(this.targetDirectory, '.next'), nextBackupPath)
    }

    const standalonePath = path.join(nextBackupPath, 'standalone')

    if (!fs.existsSync(standalonePath)) {
      throw new Error('.next/standalone directory not found.')
    }

    const standaloneFiles = await fs.readdir(standalonePath)
    for (const file of standaloneFiles) {
      const sourcePath = path.join(standalonePath, file)
      const destPath = path.join(this.targetDirectory, file)

      if (fs.existsSync(destPath)) {
        await fs.remove(destPath)
      }

      await fs.copy(sourcePath, destPath)
    }

    if (fs.existsSync(nextBackupPath)) {
      const staticFiles = path.join(nextBackupPath, 'static')
      const dest = path.join(this.targetDirectory, '.next', 'static')
      await fs.move(staticFiles, dest)
      await fs.remove(nextBackupPath)
    }
  }

  public dockerDeployment = async () => {
    console.log(chalk.blue(`Building Docker image: doke-ui`))

    if (!this.commandExecutor.runCommand('docker', ['build', '-t', `doke-ui`, '.'], this.targetDirectory)) {
      throw new Error('Failed to build docker images')
    }

    await fs.remove(this.targetDirectory)
  }
}
