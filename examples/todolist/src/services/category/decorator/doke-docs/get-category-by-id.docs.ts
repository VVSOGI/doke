import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsGetCategoryById = () => {
  const metadata: EndpointDecoratorMetadata<{
    params: 'categoryId'
    response: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'deleted'
  }> = {
    description: `This endpoint retrieves detailed information about a specific category identified by its unique categoryId.
  It returns the complete category object including its identifier, title, timestamps, and deletion status.
  The endpoint will return information even for soft-deleted categories, allowing applications to check deletion status.
  This endpoint is useful for viewing category details, verifying existence, or checking status before performing operations on the category.`,
    request: {
      params: {
        properties: {
          categoryId: {
            type: 'string',
            description: 'Target category Id that you find',
            required: true
          }
        }
      }
    },
    response: {
      example: {
        id: '16874008-8915-4d53-9239-3913f7ee2089',
        title: 'Test title',
        createdAt: '2025-02-10T13:00:27.440Z',
        updatedAt: '2025-02-10T13:00:27.440Z',
        deleted: false
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
