import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsCreateCategory = () => {
  const metadata: EndpointDecoratorMetadata<{
    body: 'title'
    headers: 'Content-Type' | 'Authorization'
    response: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'deleted'
  }> = {
    description: `This endpoint creates a new category for organizing todolist items within the system.
  It requires a title parameter which specifies the name of the category to be created.
  The response returns the complete category object with its generated unique identifier, title, timestamps, and deletion status.
  This endpoint is the first step in establishing a hierarchical organization system for todolists, allowing for logical grouping of related tasks.`,
    request: {
      body: {
        properties: {
          title: {
            type: 'string',
            description: 'Title of Category',
            required: true
          }
        }
      },
      headers: {
        properties: {
          'Content-Type': {
            default: 'application/json'
          },
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
        deleted: false
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
