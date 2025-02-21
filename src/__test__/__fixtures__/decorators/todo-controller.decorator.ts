import { ApiDocsController } from '../../../decorators'
import { ApiDocsControllerMetadata } from '../../../interfaces'
import { getControllersMockData } from '../mocks'

export const DocsTodoController = () => {
  const metadata: ApiDocsControllerMetadata = getControllersMockData('todoController')

  return ApiDocsController(metadata)
}
