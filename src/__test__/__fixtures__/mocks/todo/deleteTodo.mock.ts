export const deleteTodo = {
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
