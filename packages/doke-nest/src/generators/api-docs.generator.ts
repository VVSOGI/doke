import type { DiscoveryService } from '@nestjs/core'
import { ControllerExtractor, DocsWriter } from '.'
import { ProjectMetadata, ReceivedMetadata } from '../interfaces'
import { FileManager } from '../utils'

export class ApiDocsGenerator {
  private readonly metadata: ProjectMetadata
  private readonly writer: DocsWriter
  private readonly controllerExtractor: ControllerExtractor

  constructor(metadata: ReceivedMetadata, discoveryService: DiscoveryService, targetFolder?: string) {
    this.metadata = { ...metadata, routes: [] }
    this.writer = new DocsWriter(new FileManager(process.cwd(), targetFolder))
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
