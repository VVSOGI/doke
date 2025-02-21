import { ApiDocsControllerMetadata } from '../interfaces'
import { METADATA_KEYS } from '../constants'

export const ApiDocsController = (metadata: ApiDocsControllerMetadata): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(METADATA_KEYS.CONTROLLER, metadata, target)
    return target
  }
}
