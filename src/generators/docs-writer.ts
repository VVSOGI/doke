import type { ApiController } from '../interfaces'
import { FileManager } from '../utils'

interface WriteData {
  projectMetadata: unknown
  controllers: ApiController[]
}

export class DocsWriter {
  private readonly requiredDirectories = ['', 'routes']

  constructor(private readonly fileManager: FileManager) {}

  async writeDocumentation({ projectMetadata, controllers }: WriteData): Promise<void> {
    for (const dir of this.requiredDirectories) {
      const isExist = await this.fileManager.existsDirectory(dir)
      if (!isExist) await this.fileManager.createDirectory(dir)
    }
    await Promise.all([this.writeProjectMetadata(projectMetadata), this.writeControllerDocs(controllers)])
  }

  private async writeProjectMetadata(metadata: unknown): Promise<void> {
    await this.fileManager.saveJson('projects', metadata)
  }

  private async writeControllerDocs(controllers: ApiController[]): Promise<void> {
    await Promise.all(controllers.map((doc) => this.fileManager.saveJson(`routes/${doc.basePath}`, doc)))
  }
}
