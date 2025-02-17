import type { ApiProperty } from '.'

type MetadataPropertiesKeys = 'body' | 'query' | 'params' | 'response'

export type DefaultMetadataProperties = {
  [P in MetadataPropertiesKeys]?: string
}

export interface EndpointDecoratorMetadata<P extends DefaultMetadataProperties> {
  description: string
  request?: {
    body?: {
      type: string
      properties: P['body'] extends string ? Record<P['body'], ApiProperty> : never
      required?: string[]
    }
    query?: {
      type: string
      properties: P['query'] extends string ? Record<P['query'], ApiProperty> : never
      required?: string[]
    }
    params?: {
      type: string
      properties: P['params'] extends string ? Record<P['params'], ApiProperty> : never
      required?: string[]
    }
  }
  response?: {
    type: string
    properties?: P['response'] extends string ? Record<P['response'], ApiProperty> : never
    example?: P['response'] extends string ? Record<P['response'], any> | Array<Record<P['response'], any>> : never
  }
  deprecated?: boolean
  tags?: string[]
}
