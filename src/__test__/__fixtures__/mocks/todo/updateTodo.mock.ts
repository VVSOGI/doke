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
  response: {}
}
