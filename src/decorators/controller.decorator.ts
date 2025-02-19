import { METADATA_KEYS } from '../constants'

interface ApiDocsControllerMetadata {
  description?: string
  tags?: string[]
}

export const ApiDocsController = (metadata: ApiDocsControllerMetadata): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(METADATA_KEYS.CONTROLLER, metadata, target)
    return target
  }
}
