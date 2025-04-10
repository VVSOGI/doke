import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsGetTodolistById = () => {
  const metadata: EndpointDecoratorMetadata<{
    query: 'checked'
    params: 'categoryId'
    response: 'data' | 'total'
  }> = {
    description: `
      This endpoint retrieves a list of todolist items for a specific category identified by the categoryId parameter.
      It allows optional filtering by completion status using the "checked" query parameter.
      The response returns an array of todolist items with their complete details including ID, title, order, completion status, and timestamps.
      This endpoint is ideal for displaying all todolist items within a specific category, supporting both complete and incomplete item views.
    `,
    request: {
      query: {
        properties: {
          checked: {
            type: 'boolean',
            description: 'A status value that distinguishes completed from incomplete todolist',
            required: false
          }
        }
      },
      params: {
        properties: {
          categoryId: {
            type: 'string',
            description: `The location category's id for which you find todolist's`,
            required: true
          }
        }
      }
    },
    response: {
      example: {
        data: [
          {
            id: 'ea2a1198-9b29-4258-9021-409b81f57caf',
            categoryId: 'f144cc78-34d9-4d0a-9e95-48cf7102dce3',
            title: 'create test todolist',
            checked: false,
            order: 1,
            createdAt: '2025-02-11T09:30:08.938Z',
            updatedAt: '2025-02-11T09:30:08.938Z'
          },
          {
            id: '252a1198-9b29-4258-9021-409b81f57caf',
            categoryId: 'f144cc78-34d9-4d0a-9e95-48cf7102dce3',
            title: 'create test todolist',
            checked: false,
            order: 2,
            createdAt: '2025-02-11T09:30:08.938Z',
            updatedAt: '2025-02-11T09:30:08.938Z'
          },
          {
            id: '132a1198-9b29-4258-9021-409b81f57caf',
            categoryId: 'f144cc78-34d9-4d0a-9e95-48cf7102dce3',
            title: 'create test todolist',
            checked: false,
            order: 3,
            createdAt: '2025-02-11T09:30:08.938Z',
            updatedAt: '2025-02-11T09:30:08.938Z'
          }
        ],
        total: 3
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
