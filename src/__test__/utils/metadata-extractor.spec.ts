// src/__tests__/decorators/controller.test.ts

import { MetadataExtractor } from '../../utils'
import { TodoController } from '../__fixtures__/controllers/todo.controller'
import { getMockData } from '../__fixtures__/mocks'

describe('Testing MetadataExtractor is extract expected data', () => {
  it('should store controller metadata correctly', () => {
    const metadata = MetadataExtractor.extractControllerMetadata(TodoController)
    expect(metadata).toBeDefined()
    expect(metadata).toEqual({
      description: 'Todo items management',
      tags: ['todos']
    })
  })

  it('should return controller path metadata', () => {
    const path = MetadataExtractor.extractControllerPath(TodoController)
    expect(path).toBeDefined()
    expect(path).toEqual('todo')
  })

  it('should return method names of controller', () => {
    const prototype = TodoController.prototype
    const methodNames = MetadataExtractor.extractMethodNames(prototype)
    expect(methodNames).toBeDefined()
    expect(methodNames.length).toBeGreaterThan(0)
  })

  it('should return endpoint metadata', () => {
    const prototype = TodoController.prototype
    const methodNames = MetadataExtractor.extractMethodNames(prototype) as any[]
    const metadata = MetadataExtractor.extractEndpointMetadata(prototype, methodNames[0])
    const mock = getMockData('todo', methodNames[0])

    expect(metadata).toBeDefined()
    expect(metadata?.description).toEqual(mock.description)
  })
})
