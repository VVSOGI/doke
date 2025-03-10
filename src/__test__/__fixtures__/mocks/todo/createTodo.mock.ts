export const createTodo = {
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
    }
  }
}
