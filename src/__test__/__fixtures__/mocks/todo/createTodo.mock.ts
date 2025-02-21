export const createTodo = {
  description: 'Create a new todo item',
  request: {
    body: {
      properties: {
        title: {
          type: 'string',
          description: 'Todo item title'
        }
      },
      required: ['title']
    }
  },
  response: {
    properties: {
      id: {
        type: 'string',
        description: 'Created todo item ID'
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
    }
  }
}
