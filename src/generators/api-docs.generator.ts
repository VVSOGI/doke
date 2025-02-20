import type { DiscoveryService } from '@nestjs/core'
import { FileManager } from '../utils'
import { ControllerExtractor, DocsWriter } from '.'

export interface ProjectMetadata {
  name: string
  description: string
  version: string
  routes: string[]
}

export class ApiDocsGenerator {
  private readonly metadata: ProjectMetadata
  private readonly writer: DocsWriter
  private readonly controllerExtractor: ControllerExtractor

  constructor(metadata: Omit<ProjectMetadata, 'routes'>, outputPath: string, discoveryService: DiscoveryService, targetFolder?: string) {
    this.metadata = { ...metadata, routes: [] }
    this.writer = new DocsWriter(new FileManager(outputPath, targetFolder))
    this.controllerExtractor = new ControllerExtractor(discoveryService)
  }

  async generate(): Promise<void> {
    const controllers = await this.controllerExtractor.extract()
    const projectMetadata: ProjectMetadata = {
      ...this.metadata,
      routes: controllers.map((controller) => controller.basePath)
    }
    await this.writer.writeDocumentation({ projectMetadata, controllers })
  }
}
