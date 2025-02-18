import { METADATA_KEYS } from 'src/constants'
import type { EndpointDecoratorMetadata, DefaultMetadataProperties } from '../interfaces'

export const ApiDocsEndpoint = <P extends DefaultMetadataProperties>(metadata: EndpointDecoratorMetadata<P>): MethodDecorator => {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(METADATA_KEYS.ENDPOINT, metadata, target, propertyKey)
    return descriptor
  }
}
