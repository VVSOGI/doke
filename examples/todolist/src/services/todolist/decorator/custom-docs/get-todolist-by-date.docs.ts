import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsGetTodolistByDate = () => {
  const metadata: EndpointDecoratorMetadata<{
    query: 'checked'
    params: 'categoryId'
    response: 'data' | 'total'
  }> = {
    description: `
      This endpoint retrieves todolist items organized by date for a specific category. 
      It allows filtering by completion status through the optional "checked" query parameter. The response returns todolist items grouped by date, 
      with each date containing an array of todolist objects that were either created or updated on that date. 
      This endpoint is particularly useful for displaying calendar views or tracking todolist activity over time.
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
            date: '2025-02-02',
            todolists: [
              {
                id: '535edc91-2d9a-404c-a400-175a8e5b2a08',
                categoryId: 'f144cc78-34d9-4d0a-9e95-48cf7102dce3',
                title: 'changed',
                checked: true,
                order: 12,
                createdAt: '2025-02-02T23:46:46.529Z',
                updatedAt: '2025-02-02T23:46:54.255Z'
              },
              {
                id: 'c62af2fe-4f20-4ed4-8242-ea4deb243e05',
                categoryId: 'f144cc78-34d9-4d0a-9e95-48cf7102dce3',
                title: 'somethin',
                checked: true,
                order: 11,
                createdAt: '2025-02-02T23:46:27.215Z',
                updatedAt: '2025-02-02T23:46:28.977Z'
              }
            ]
          },
          {
            date: '2025-01-31',
            todolists: [
              {
                id: '2a9441d7-b8c9-4e03-960f-10215801751a',
                categoryId: 'f144cc78-34d9-4d0a-9e95-48cf7102dce3',
                title: 'Wabirubi dupdup!!!',
                checked: true,
                order: 0,
                createdAt: '2025-01-22T03:05:22.323Z',
                updatedAt: '2025-01-31T23:26:47.174Z'
              }
            ]
          }
        ],
        total: 2
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
