import { EndpointDecoratorMetadata } from '../../../../interfaces'

export const deleteTodo: EndpointDecoratorMetadata<{
  params: 'id'
  response: 'success'
}> = {
  description: 'Delete a todo item',
  request: {
    params: {
      properties: {
        id: {
          type: 'string',
          description: 'Todo item ID to delete',
          required: true
        }
      }
    }
  },
  response: {}
}
