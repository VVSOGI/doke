import { INestApplication } from '@nestjs/common'
import { MetadataExtractor } from '../utils/metadata-extractor'
import { FileManager } from '../utils/file-manager'
import { ERROR_MESSAGES } from '../constants'
import type { ApiController } from '../interfaces'

interface ProjectMetadata {
  name: string
  description: string
  version: string
  routes: string[]
}

export class ApiDocsGenerator {
  private readonly docs: ApiController[]
  private readonly projectMetadata: ProjectMetadata
  private readonly fileManager: FileManager

  constructor(metadata: Omit<ProjectMetadata, 'routes'>, outputPath: string, targetFolder?: string) {
    this.docs = []
    this.projectMetadata = { ...metadata, routes: [] }
    this.fileManager = new FileManager(outputPath, targetFolder)
  }

  async generateDocs(app: INestApplication<any>, Test: any) {
    const discoveryService = app.get(Test)
    if (!discoveryService) {
      throw new Error(ERROR_MESSAGES.NO_DISCOVERY_SERVICE)
    }

    const controllers = discoveryService.getControllers()

    for (const wrapper of controllers) {
      if (!wrapper.instance || !wrapper.metatype) continue

      const prototype = Object.getPrototypeOf(wrapper.instance)
      const controllerPath = MetadataExtractor.extractControllerPath(wrapper.metatype)
      if (!controllerPath) continue

      const controllerMetadata = MetadataExtractor.extractControllerMetadata(wrapper.metatype)
      const methodNames = MetadataExtractor.extractMethodNames(prototype)

      // console.log(methodNames.map((methodName) => MetadataExtractor.extractEndpointMetadata(prototype, methodName)))

      const endpoints = methodNames
        .map((methodName) => MetadataExtractor.extractEndpointMetadata(prototype, methodName))
        .filter((endpoint): endpoint is NonNullable<typeof endpoint> => endpoint !== null)

      if (endpoints.length === 0) continue

      this.projectMetadata.routes.push(controllerPath)

      this.docs.push({
        controllerName: wrapper.metatype.name,
        basePath: controllerPath,
        description: controllerMetadata?.description,
        tags: controllerMetadata?.tags,
        endpoints
      })
    }

    await this.fileManager.createDirectoryStructure()
    await this.saveProjectMetadata()
    await this.saveRouteDocs()
  }

  private async saveProjectMetadata() {
    await this.fileManager.saveJson('projects', this.projectMetadata)
  }

  private async saveRouteDocs() {
    for (const doc of this.docs) {
      await this.fileManager.saveJson(`routes/${doc.basePath}`, doc)
    }
  }
}
