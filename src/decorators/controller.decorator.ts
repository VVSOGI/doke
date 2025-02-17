interface ApiDocsControllerMetadata {
  description?: string
  tags?: string[]
}

export const ApiDocsController = (metadata: ApiDocsControllerMetadata): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('api:controller', metadata, target)
    return target
  }
}
