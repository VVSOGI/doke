import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsUpdateTodolist = () => {
  const metadata: EndpointDecoratorMetadata<{
    body: 'id' | 'title' | 'checked'
    headers: 'Content-Type'
    response: 'id' | 'categoryId' | 'title' | 'checked' | 'order' | 'createdAt' | 'updatedAt'
  }> = {
    description: `This endpoint updates the properties of a specific todolist item identified by its unique ID.
  It allows modifying the title and/or completion status of the todolist item, with both fields being optional.
  The response returns the complete updated todolist object with all its properties, including the modified fields and updated timestamp.
  This endpoint supports partial updates, making it flexible for various editing scenarios like marking items complete or renaming tasks.`,
    request: {
      body: {
        properties: {
          id: {
            type: 'string',
            description: 'Target todolist id that you want update',
            required: true
          },
          title: {
            type: 'string',
            description: 'The title of the todolist you want to update',
            required: false
          },
          checked: {
            type: 'boolean',
            description: 'Update the completion status of the todolist you want to update property',
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
        id: 'd55232cb-c8df-465e-8ea7-ce11e884dc2e',
        categoryId: 'f144cc78-34d9-4d0a-9e95-48cf7102dce3',
        title: 'update title',
        checked: true,
        order: 2,
        createdAt: '2025-01-22T03:04:28.724Z',
        updatedAt: '2025-02-11T10:01:42.379Z'
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
