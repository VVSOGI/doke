import { MetadataExtractor } from '../../utils'
import { TodoController } from '../__fixtures__/controllers'
import { createTodo, getAllTodos } from '../__fixtures__/mocks/todo'

describe('Todo API Decorators', () => {
  describe('DocsGetAllTodos', () => {
    it('should call with correct metadata from mock', () => {
      const mock = getAllTodos
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const getAllTodosMethod = methodNames.find((method) => method === 'getAllTodos')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, getAllTodosMethod)

      expect(metadata?.description).toEqual(mock.description)
      expect(metadata?.response).toEqual(mock.response)
    })
  })

  describe('DocsCreateTodo', () => {
    it('should call with correct metadata from mock', () => {
      const mock = createTodo
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const createTodoMethod = methodNames.find((method) => method === 'createTodo')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, createTodoMethod)

      expect(metadata?.description).toEqual(mock.description)
      expect(metadata?.request).toEqual(mock.request)
      expect(metadata?.response).toEqual(mock.response)
    })
  })
})
