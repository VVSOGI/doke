export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL' | 'OPTIONS' | 'HEAD'

export interface ApiProperty {
  type: string
  description: string
  required: boolean
  example?: any
}

export interface ApiParameters {
  type: string
  properties: Record<string, ApiProperty>
}

export interface ApiHeaderProperty {
  default?: string
  required?: boolean
}

export interface ApiHeadersParameters {
  properties: Record<string, ApiHeaderProperty>
}

export interface ApiRequest {
  body?: ApiParameters
  query?: ApiParameters
  params?: ApiParameters
  headers?: ApiHeadersParameters
}

export interface ApiResponse {
  type: string
  description?: string
  example?: any
}

export * from './endpoint.interface'
export * from './documentation.interface'
export * from './decorator.interface'
export * from './metadata.interface'
