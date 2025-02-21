import { ApiDocsController } from '../../../decorators'
import { ApiDocsControllerMetadata } from '../../../interfaces'

export const DocsTodoController = () => {
  const metadata: ApiDocsControllerMetadata = {
    description: 'Todo items management',
    tags: ['todos']
  }

  return ApiDocsController(metadata)
}
