// src/__tests__/__fixtures__/mock-data/todo-endpoints.mock.ts

import { EndpointDecoratorMetadata } from '../../../interfaces'
import { ApiDocsEndpoint } from '../../../decorators'

export const DocsGetAllTodos = () => {
  const metadata: EndpointDecoratorMetadata<{
    response: 'id' | 'title' | 'completed' | 'createdAt' | 'updatedAt'
  }> = {
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

  return ApiDocsEndpoint(metadata)
}

export const DocsCreateTodo = () => {
  const metadata: EndpointDecoratorMetadata<{
    body: 'title'
    response: 'id' | 'title' | 'completed' | 'createdAt' | 'updatedAt'
  }> = {
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

  return ApiDocsEndpoint(metadata)
}

export const DocsUpdateTodo = () => {
  const metadata: EndpointDecoratorMetadata<{
    params: 'id'
    body: 'title' | 'completed'
    response: 'id' | 'title' | 'completed' | 'createdAt' | 'updatedAt'
  }> = {
    description: 'Update a todo item',
    request: {
      params: {
        properties: {
          id: {
            type: 'string',
            description: 'Todo item ID to update'
          }
        },
        required: ['id']
      },
      body: {
        properties: {
          title: {
            type: 'string',
            description: 'New todo item title'
          },
          completed: {
            type: 'boolean',
            description: 'New completion status'
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

  return ApiDocsEndpoint(metadata)
}

export const DocsDeleteTodo = () => {
  const metadata: EndpointDecoratorMetadata<{
    params: 'id'
    response: 'success'
  }> = {
    description: 'Delete a todo item',
    request: {
      params: {
        properties: {
          id: {
            type: 'string',
            description: 'Todo item ID to delete'
          }
        },
        required: ['id']
      }
    },
    response: {
      properties: {
        success: {
          type: 'boolean',
          description: 'Deletion success status'
        }
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
