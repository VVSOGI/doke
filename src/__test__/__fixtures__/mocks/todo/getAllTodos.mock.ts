export const getAllTodos = {
  description: 'Get all todo items',
  response: {
    properties: {
      id: {
        type: 'string',
        description: 'Todo item ID'
      },
      title: {
        type: 'string',
        description: 'Todo item title'
      },
      completed: {
        type: 'boolean',
        description: 'Completion status'
      },
      createdAt: {
        type: 'string',
        description: 'Creation timestamp'
      },
      updatedAt: {
        type: 'string',
        description: 'Last update timestamp'
      }
    },
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
