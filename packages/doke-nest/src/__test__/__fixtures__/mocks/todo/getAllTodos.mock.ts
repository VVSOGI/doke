import { EndpointDecoratorMetadata } from '../../../../interfaces'

export const getAllTodos: EndpointDecoratorMetadata<{
  response: 'id' | 'title' | 'completed' | 'createdAt' | 'updatedAt'
}> = {
  description: 'Get all todo items',
  request: {},
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
