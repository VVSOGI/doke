import { METADATA_KEYS } from '../constants'
import type { ApiEndpoint, ApiEndpointMetadata, ApiController, HttpMethod } from '../interfaces'

export class MetadataExtractor {
  static extractControllerMetadata(controller: any): Pick<ApiController, 'description' | 'tags'> | null {
    const metadata = Reflect.getMetadata(METADATA_KEYS.CONTROLLER, controller)
    if (!metadata) return null

    return {
      description: metadata.description,
      tags: metadata.tags
    }
  }

  static extractControllerPath(controller: any): string | null {
    return Reflect.getMetadata(METADATA_KEYS.PATH, controller)
  }

  static extractEndpointMetadata(prototype: any, methodName: string): ApiEndpoint | null {
    const metadata: ApiEndpointMetadata = Reflect.getMetadata(METADATA_KEYS.ENDPOINT, prototype, methodName)
    if (!metadata) return null

    const path = Reflect.getMetadata(METADATA_KEYS.PATH, prototype[methodName])
    const methodValue = Reflect.getMetadata(METADATA_KEYS.METHOD, prototype[methodName])

    if (!path || methodValue === undefined) return null

    const method = this.convertMethodValueToString(methodValue)
    if (!method) return null

    return {
      path,
      method,
      name: methodName,
      ...metadata
    }
  }

  static extractMethodNames(prototype: any): string[] {
    return Object.getOwnPropertyNames(prototype).filter((prop) => prop !== 'constructor' && typeof prototype[prop] === 'function')
  }

  private static convertMethodValueToString(methodValue: number): HttpMethod | null {
    const methodMap: Record<number, HttpMethod> = {
      0: 'GET',
      1: 'POST',
      2: 'PUT',
      3: 'DELETE',
      4: 'PATCH',
      5: 'ALL',
      6: 'OPTIONS',
      7: 'HEAD'
    }

    return methodMap[methodValue] || null
  }
}
