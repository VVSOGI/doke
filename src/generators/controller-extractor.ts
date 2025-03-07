import { DiscoveryService } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'

import type { ApiController } from '../interfaces'
import { MetadataExtractor, CommonUtils } from '../utils'
import { ERROR_MESSAGES } from '../constants'

export class ControllerExtractor {
  constructor(private readonly discoveryService: DiscoveryService) {
    this.validateDiscoveryService()
  }

  private validateDiscoveryService(): void {
    if (!this.discoveryService) {
      throw new Error(ERROR_MESSAGES.NO_DISCOVERY_SERVICE)
    }
  }

  async extract(): Promise<ApiController[]> {
    const controllers = this.discoveryService.getControllers()
    return controllers.map((wrapper) => this.extractControllerInfo(wrapper)).filter((info): info is ApiController => info !== null)
  }

  private extractControllerInfo(wrapper: InstanceWrapper<any>): ApiController | null {
    if (!this.isValidWrapper(wrapper)) return null

    const prototype = Object.getPrototypeOf(wrapper.instance)
    const controllerPath = MetadataExtractor.extractControllerPath(wrapper.metatype)
    if (!controllerPath) return null

    const methodNames = MetadataExtractor.extractMethodNames(prototype)
    const endpoints = methodNames
      .map((methodName) => MetadataExtractor.extractEndpointMetadata(prototype, methodName))
      .filter((endpoint): endpoint is NonNullable<typeof endpoint> => endpoint !== null)
    const controllerMetadata = MetadataExtractor.extractControllerMetadata(wrapper.metatype)

    return {
      controllerName: CommonUtils.camelToPascalCase(controllerPath),
      basePath: controllerPath,
      description: controllerMetadata?.description,
      tags: controllerMetadata?.tags,
      endpoints
    }
  }

  private isValidWrapper(wrapper: { instance: any; metatype: any }): boolean {
    return !!(wrapper.instance && wrapper.metatype)
  }
}
