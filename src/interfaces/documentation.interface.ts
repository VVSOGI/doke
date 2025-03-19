import type { ApiEndpoint } from './endpoint.interface'

export interface ApiController {
  controllerName: string
  basePath: string
  description?: string
  tags?: string[]
  endpoints: ApiEndpoint[]
}

export interface ApiDocumentation {
  info: {
    title: string
    description?: string
    version: string
  }
  servers: Array<{
    url: string
    description?: string
  }>
  controllers: ApiController[]
}
