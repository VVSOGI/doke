import { MetadataExtractor } from '../../utils'
import { TodoController } from '../__fixtures__/controllers'
import { getAllTodos } from '../__fixtures__/mocks/todo'

describe('Todo API Decorators', () => {
  describe('DocsGetAllTodos', () => {
    it('should call ApiDocsEndpoint with correct metadata from mock', () => {
      const mock = getAllTodos
      const prototype = TodoController.prototype
      const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
      const getAllTodosMethod = methodNames.find((method) => method === 'getAllTodos')
      const metadata = MetadataExtractor.extractEndpointMetadata(prototype, getAllTodosMethod)

      expect(metadata?.description).toEqual(mock.description)
      expect(metadata?.response).toEqual(mock.response)
    })
  })
})
