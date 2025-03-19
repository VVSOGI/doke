import { EndpointDecoratorMetadata } from '../../../../interfaces'

export const getAllTodos: EndpointDecoratorMetadata<{
  headers: 'Content-Type'
  response: 'id' | 'title' | 'completed' | 'createdAt' | 'updatedAt'
}> = {
  description: 'Get all todo items',
  request: {
    headers: {
      properties: {
        'Content-Type': {
          default: 'application/json'
        }
      }
    }
  },
  response: {
    example: [
      {
        id: '123',
        title: 'Test todo',
        completed: false,
        createdAt: '2025-02-21T00:00:00.000Z',
        updatedAt: '2025-02-21T00:00:00.000Z'
      }
    ]
  }
}
