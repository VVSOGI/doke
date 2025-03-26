import type { HttpMethod, ApiRequest, ApiResponse } from '.'

export interface ApiEndpoint {
  path: string
  method: HttpMethod
  name: string
  description: string
  deprecated?: boolean
  tags?: string[]
  request?: ApiRequest
  response?: ApiResponse
}

export interface ApiEndpointMetadata {
  description: string
  request?: ApiRequest
  response?: ApiResponse
  deprecated?: boolean
  tags?: string[]
}
