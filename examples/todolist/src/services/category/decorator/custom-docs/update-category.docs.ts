import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsUpdateCategory = () => {
  const metadata: EndpointDecoratorMetadata<{
    headers: 'Content-Type'
    params: 'categoryId'
    body: 'title'
    response: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'deleted'
  }> = {
    description: `This endpoint updates the properties of a specific category identified by its unique categoryId parameter.
  It allows modifying the category's title and potentially other properties (though the request body specification appears incomplete in this definition).
  The response returns the complete updated category object with all its properties, including the modified fields and refreshed updatedAt timestamp.
  Note that this endpoint appears to be missing the request body definition which would typically specify which fields can be updated.`,
    request: {
      params: {
        properties: {
          categoryId: {
            type: 'string',
            description: 'Target category id that you want update',
            required: true
          }
        }
      },
      body: {
        properties: {
          title: {
            type: 'string',
            description: 'Write title of category that you want update',
            required: false
          }
        }
      },
      headers: {
        properties: {
          'Content-Type': {
            default: 'application/json'
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
        deleted: false
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
