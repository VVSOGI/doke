import { EndpointDecoratorMetadata } from '../../../../interfaces'

export const updateTodo: EndpointDecoratorMetadata<{
  params: 'id'
  body: 'title' | 'completed'
  headers: 'Content-Type'
  response: 'id' | 'title' | 'completed' | 'createdAt' | 'updatedAt'
}> = {
  description: 'Update a todo item',
  request: {
    headers: {
      properties: {
        'Content-Type': {
          default: 'application/json'
        }
      }
    },
    params: {
      properties: {
        id: {
          type: 'string',
          description: 'Todo item ID to update',
          required: true
        }
      }
    },
    body: {
      properties: {
        title: {
          type: 'string',
          description: 'New todo item title',
          required: false
        },
        completed: {
          type: 'boolean',
          description: 'New completion status',
          required: false
        }
      }
    }
  },
  response: {}
}
