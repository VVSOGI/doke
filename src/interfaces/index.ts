export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL' | 'OPTIONS' | 'HEAD'

export interface ApiProperty {
  type: string
  description: string
  required?: boolean
  example?: any
  enum?: string[]
  items?: ApiProperty
}

export interface ApiParameters {
  type: string
  properties: Record<string, ApiProperty>
  required?: string[]
}

export interface ApiRequest {
  body?: ApiParameters
  query?: ApiParameters
  params?: ApiParameters
  headers?: ApiParameters
}

export interface ApiResponse {
  type: string
  description?: string
  example?: any
  properties?: Record<string, ApiProperty>
}

export * from './endpoint.interface'
export * from './documentation.interface'
export * from './decorator.interface'
