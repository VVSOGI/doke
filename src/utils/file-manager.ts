import * as fs from 'fs/promises'
import * as path from 'path'
import { DEFAULT_CONFIG, ERROR_MESSAGES } from '../constants'

export class FileManager {
  private readonly basePath: string

  constructor(outputPath: string) {
    this.basePath = path.isAbsolute(outputPath) ? outputPath : path.join(process.cwd(), outputPath)
  }

  async existsDirectory(dirPath: string): Promise<boolean> {
    const fullPath = path.join(this.basePath, dirPath)
    try {
      await fs.access(fullPath)
      return true
    } catch {
      return false
    }
  }

  async createDirectory(dirPath: string): Promise<void> {
    const fullPath = path.join(this.basePath, dirPath)
    try {
      await fs.mkdir(fullPath, { recursive: true })
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.DIRECTORY_CREATE_FAILED}: ${error.message}`)
    }
  }

  async saveJson(filePath: string, data: unknown): Promise<void> {
    if (!filePath) {
      throw new Error(ERROR_MESSAGES.INVALID_PATH)
    }

    const dirPath = path.dirname(filePath)
    const isExist = await this.existsDirectory(dirPath)
    if (!isExist) {
      await this.createDirectory(dirPath)
    }

    const fullPath = path.join(this.basePath, filePath)
    try {
      await fs.writeFile(fullPath, JSON.stringify(data, null, DEFAULT_CONFIG.JSON_INDENT), DEFAULT_CONFIG.ENCODINGS)
    } catch (error) {
      throw new Error(`${ERROR_MESSAGES.FILE_WRITE_FAILED}: ${error.message}`)
    }
  }

  async createDirectoryStructure(): Promise<void> {
    const directories = ['', DEFAULT_CONFIG.ROUTES]

    for (const dir of directories) {
      const isExist = await this.existsDirectory(dir)
      if (!isExist) {
        await this.createDirectory(dir)
      }
    }
  }

  async cleanDirectory(): Promise<void> {
    try {
      await fs.rm(this.basePath, { recursive: true, force: true })
    } catch (error) {
      throw new Error(`Failed to clean directory: ${error.message}`)
    }
  }
}
