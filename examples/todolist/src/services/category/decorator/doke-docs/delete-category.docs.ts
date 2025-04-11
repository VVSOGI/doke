import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsDeleteCategory = () => {
  const metadata: EndpointDecoratorMetadata<{
    params: 'categoryId'
    headers: 'Authorization'
    response: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'deleted'
  }> = {
    description: `This endpoint performs a soft delete on a specific category identified by its unique categoryId.
  The operation marks the category as deleted in the database rather than permanently removing it, enabling potential recovery if needed.
  The response returns the complete category object with updated deletion status and timestamp information.
  When a category is deleted, all associated todolist items typically become inaccessible through normal API operations.`,
    request: {
      params: {
        properties: {
          categoryId: {
            type: 'string',
            description: 'Target category id that you want delete',
            required: true
          }
        }
      },
      headers: {
        properties: {
          Authorization: {
            default: '',
            credentials: {
              type: 'Bearer'
            }
          }
        }
      }
    },
    response: {
      example: {
        id: '98874008-8915-4d53-9239-3913f7ee2089',
        title: 'Test title',
        createdAt: '2025-02-10T13:00:27.440Z',
        updatedAt: '2025-02-10T13:00:27.440Z',
        deleted: true
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
