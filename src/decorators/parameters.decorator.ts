interface ApiDocsParameterMetadata {
  type: string
  properties: Record<string, any>
  required?: string[]
}

const createParameterDecorator = (metadataKey: string) => {
  return (metadata: ApiDocsParameterMetadata): ParameterDecorator => {
    return (target: any, propertyKey: string | symbol) => {
      const existingMetadata = Reflect.getMetadata(metadataKey, target, propertyKey) || {}
      Reflect.defineMetadata(metadataKey, { ...existingMetadata, ...metadata }, target, propertyKey)
    }
  }
}

export const ApiDocsBody = createParameterDecorator('api:body')
export const ApiDocsQuery = createParameterDecorator('api:query')
export const ApiDocsParam = createParameterDecorator('api:param')
