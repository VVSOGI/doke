import { EndpointDecoratorMetadata } from '../../../../interfaces'

export const createTodo: EndpointDecoratorMetadata<{
  body: 'title'
  headers: 'Content-Type'
}> = {
  description: 'Create a new todo item',
  request: {
    body: {
      properties: {
        title: {
          type: 'string',
          description: 'Todo item title',
          required: true
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
  }
}
