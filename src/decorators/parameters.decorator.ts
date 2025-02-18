import { METADATA_KEYS } from 'src/constants'

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

export const ApiDocsBody = createParameterDecorator(METADATA_KEYS.BODY)
export const ApiDocsQuery = createParameterDecorator(METADATA_KEYS.QUERY)
export const ApiDocsParam = createParameterDecorator(METADATA_KEYS.PARAM)
