import type { ApiController } from '../interfaces'
import { DiscoveryService } from '@nestjs/core'
import { MetadataExtractor } from '../utils/metadata-extractor'
import { FileManager } from '../utils/file-manager'
import { ERROR_MESSAGES } from '../constants'

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

  async generateDocs(discoveryService: DiscoveryService): Promise<void> {
    this.validateDiscoveryService(discoveryService)
    const data = await this.getControllersInfo(discoveryService)
    this.storeControllersInfo(data)
    await this.saveDocumentation()
  }

  private validateDiscoveryService(discoveryService: DiscoveryService): void {
    if (!discoveryService) {
      throw new Error(ERROR_MESSAGES.NO_DISCOVERY_SERVICE)
    }
  }

  private storeControllersInfo(data: ApiController[]) {
    for (const info of data) {
      this.projectMetadata.routes.push(info.basePath)
      this.docs.push(info)
    }
  }

  private extractControllerInfo(wrapper: { instance: any; metatype: any }): ApiController | null {
    if (!this.isValidWrapper(wrapper)) return null

    const prototype = Object.getPrototypeOf(wrapper.instance)
    const controllerPath = MetadataExtractor.extractControllerPath(wrapper.metatype)
    if (!controllerPath) return null

    const endpoints = this.extractEndpoints(prototype)
    if (endpoints.length === 0) return null

    const controllerMetadata = MetadataExtractor.extractControllerMetadata(wrapper.metatype)

    return {
      controllerName: wrapper.metatype.name,
      basePath: controllerPath,
      description: controllerMetadata?.description,
      tags: controllerMetadata?.tags,
      endpoints
    }
  }

  private isValidWrapper(wrapper: { instance: any; metatype: any }): boolean {
    return !!(wrapper.instance && wrapper.metatype)
  }

  private extractEndpoints(prototype: any): ApiController['endpoints'] {
    const methodNames = MetadataExtractor.extractMethodNames(prototype)
    return methodNames
      .map((methodName) => MetadataExtractor.extractEndpointMetadata(prototype, methodName))
      .filter((endpoint): endpoint is NonNullable<typeof endpoint> => endpoint !== null)
  }

  private async getControllersInfo(discoveryService: DiscoveryService) {
    const controllers = discoveryService.getControllers()
    const extractions: ApiController[] = []
    for (const wrapper of controllers) {
      const controllerInfo = this.extractControllerInfo(wrapper)
      if (controllerInfo) extractions.push(controllerInfo)
    }
    return extractions
  }

  private async saveDocumentation(): Promise<void> {
    await this.fileManager.createDirectoryStructure()
    await Promise.all([this.saveProjectMetadata(), this.saveRouteDocs()])
  }

  private async saveProjectMetadata(): Promise<void> {
    await this.fileManager.saveJson('projects', this.projectMetadata)
  }

  private async saveRouteDocs(): Promise<void> {
    await Promise.all(this.docs.map((doc) => this.fileManager.saveJson(`routes/${doc.basePath}`, doc)))
  }
}
