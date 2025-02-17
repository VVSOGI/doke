import 'reflect-metadata'
import type { EndpointDecoratorMetadata, DefaultMetadataProperties } from '../interfaces'

export const ApiDocsEndpoint = <P extends DefaultMetadataProperties>(metadata: EndpointDecoratorMetadata<P>): MethodDecorator => {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata('api:endpoint', metadata, target, propertyKey)
    return descriptor
  }
}
