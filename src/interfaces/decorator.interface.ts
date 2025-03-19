import type { ApiHeaderProperty, ApiProperty } from '.'

type MetadataPropertiesKeys = 'body' | 'query' | 'params' | 'response' | 'headers'

export interface ApiDocsControllerMetadata {
  description?: string
  tags?: string[]
}

export type DefaultMetadataProperties = {
  [P in MetadataPropertiesKeys]?: string
}

export interface EndpointDecoratorMetadata<P extends DefaultMetadataProperties> {
  description: string
  request?: {
    body?: {
      properties: P['body'] extends string ? Record<P['body'], ApiProperty> : never
    }
    query?: {
      properties: P['query'] extends string ? Record<P['query'], ApiProperty> : never
    }
    params?: {
      properties: P['params'] extends string ? Record<P['params'], ApiProperty> : never
    }
    headers?: {
      properties: P['headers'] extends string ? Record<P['headers'], ApiHeaderProperty> : never
    }
  }
  response?: {
    example?: P['response'] extends string ? Record<P['response'], any> | Array<Record<P['response'], any>> : never
  }
  deprecated?: boolean
  tags?: string[]
}
