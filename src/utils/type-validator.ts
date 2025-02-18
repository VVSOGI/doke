import { ERROR_MESSAGES } from 'src/constants'
import type { HttpMethod, ApiEndpointMetadata, ApiProperty, ApiParameters, ApiRequest, ApiResponse } from 'src/interfaces'

export class TypeValidator {
  private static readonly VALID_HTTP_METHODS: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL', 'OPTIONS', 'HEAD']
  private static readonly VALID_PARAMETER_TYPES = ['string', 'number', 'boolean', 'object', 'array']

  static isValidHttpMethod(method: string): method is HttpMethod {
    return this.VALID_HTTP_METHODS.includes(method as HttpMethod)
  }

  static isValidPropertyType(type: string): boolean {
    return this.VALID_PARAMETER_TYPES.includes(type.toLowerCase())
  }

  static validateEndpointMetadata(metadata: ApiEndpointMetadata): void {
    if (!metadata.description) {
      throw new Error(`${ERROR_MESSAGES.NO_ENDPOINT_METADATA}: Missing description`)
    }

    if (metadata.response) {
      this.validateResponse(metadata.response)
    }

    if (metadata.request) {
      this.validateRequest(metadata.request)
    }
  }

  static validateRequest(request: ApiRequest): void {
    if (request.body) this.validateParameters(request.body, 'body')
    if (request.query) this.validateParameters(request.query, 'query')
    if (request.params) this.validateParameters(request.params, 'params')
    if (request.headers) this.validateParameters(request.headers, 'headers')
  }

  static validateResponse(response: ApiResponse): void {
    if (!response.type) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: Response must have a type`)
    }

    if (!this.isValidPropertyType(response.type)) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: Invalid response type '${response.type}'`)
    }

    if (response.properties) {
      Object.entries(response.properties).forEach(([key, property]) => {
        this.validateProperty(property, `response.${key}`)
      })
    }
  }

  static validateParameters(parameters: ApiParameters, location: string): void {
    if (!parameters.type) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: ${location} parameters must have a type`)
    }

    if (!parameters.properties) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: ${location} parameters must have properties`)
    }

    Object.entries(parameters.properties).forEach(([key, property]) => {
      this.validateProperty(property, `${location}.${key}`)
    })

    if (parameters.required) {
      const propertyKeys = Object.keys(parameters.properties)
      parameters.required.forEach((requiredKey) => {
        if (!propertyKeys.includes(requiredKey)) {
          throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: Required property '${requiredKey}' not found in ${location} properties`)
        }
      })
    }
  }

  static validateProperty(property: ApiProperty, path: string): void {
    if (!property.type) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: Missing type for property at ${path}`)
    }

    if (!this.isValidPropertyType(property.type)) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: Invalid type '${property.type}' for property at ${path}`)
    }

    if (!property.description) {
      throw new Error(`${ERROR_MESSAGES.INVALID_CONFIG}: Missing description for property at ${path}`)
    }

    if (property.items) {
      this.validateProperty(property.items, `${path}[]`)
    }
  }
}
