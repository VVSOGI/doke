import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsGetCategory = () => {
  const metadata: EndpointDecoratorMetadata<{
    query: 'deleted'
    response: 'data' | 'total'
  }> = {
    description: `This endpoint retrieves a list of all categories in the system with optional filtering by deletion status.
  It accepts an optional "deleted" query parameter that allows filtering results to show only active categories, only deleted categories, or all categories.
  The response returns an array of category objects, each containing complete information including identifier, title, timestamps, and deletion status.
  This endpoint is ideal for populating category selection dropdowns, displaying category management interfaces, or generating reports on category usage.`,
    request: {
      query: {
        properties: {
          deleted: {
            type: 'boolean',
            description: `Get all category Based on the query.`,
            required: false
          }
        }
      }
    },
    response: {
      example: {
        data: [
          {
            id: '16874008-8915-4d53-9239-3913f7ee2089',
            title: 'Test title',
            createdAt: '2025-02-10T13:00:27.440Z',
            updatedAt: '2025-02-10T13:00:27.440Z',
            deleted: false
          },
          {
            id: '40874008-8915-4d53-9239-3913f7ee2089',
            title: 'Test title',
            createdAt: '2025-02-10T13:00:27.440Z',
            updatedAt: '2025-02-10T13:00:27.440Z',
            deleted: false
          },
          {
            id: '98874008-8915-4d53-9239-3913f7ee2089',
            title: 'Test title',
            createdAt: '2025-02-10T13:00:27.440Z',
            updatedAt: '2025-02-10T13:00:27.440Z',
            deleted: false
          }
        ],
        total: 3
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
