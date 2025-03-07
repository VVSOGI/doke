export const updateTodo = {
  description: 'Update a todo item',
  request: {
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
  response: {
    properties: {
      id: {
        type: 'string',
        description: 'Updated todo item ID'
      },
      title: {
        type: 'string',
        description: 'Updated todo item title'
      },
      completed: {
        type: 'boolean',
        description: 'Updated completion status'
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
