import { MetadataExtractor } from '../../utils'
import { TodoController } from '../__fixtures__/controllers'
import { createTodo, deleteTodo, getAllTodos, getAllTodosByDates, updateTodo } from '../__fixtures__/mocks/todo'

describe('Todo API Decorators', () => {
  describe('DocsGetAllTodos', () => {
    it('should call with correct metadata from mock', () => {
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const getAllTodosMethod = methodNames.find((method) => method === 'getAllTodos')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, getAllTodosMethod)

      expect(metadata?.method).toEqual('GET')
      expect(metadata?.description).toEqual(getAllTodos.description)
      expect(metadata?.response).toEqual(getAllTodos.response)
    })
  })

  describe('DocsGetAllTodosByDates', () => {
    it('should call with correct metadata from mock', () => {
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const getAllTodosByDatesMethod = methodNames.find((method) => method === 'getAllTodosByDates')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, getAllTodosByDatesMethod)

      expect(metadata?.method).toEqual('GET')
      expect(metadata?.description).toEqual(getAllTodosByDates.description)
      expect(metadata?.response).toEqual(getAllTodosByDates.response)
    })
  })

  describe('DocsCreateTodo', () => {
    it('should call with correct metadata from mock', () => {
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const createTodoMethod = methodNames.find((method) => method === 'createTodo')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, createTodoMethod)

      expect(metadata?.method).toEqual('POST')
      expect(metadata?.description).toEqual(createTodo.description)
      expect(metadata?.request).toEqual(createTodo.request)
    })
  })

  describe('DocsUpdateTodo', () => {
    it('should call with correct metadata from mock', () => {
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const updateTodoMethod = methodNames.find((method) => method === 'updateTodo')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, updateTodoMethod)

      expect(metadata?.method).toEqual('PATCH')
      expect(metadata?.description).toEqual(updateTodo.description)
      expect(metadata?.request).toEqual(updateTodo.request)
    })
  })

  describe('DocsDeleteTodo', () => {
    it('should call with correct metadata from mock', () => {
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const deleteTodoMethod = methodNames.find((method) => method === 'deleteTodo')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, deleteTodoMethod)

      expect(metadata?.method).toEqual('DELETE')
      expect(metadata?.description).toEqual(deleteTodo.description)
      expect(metadata?.request).toEqual(deleteTodo.request)
    })
  })
})
