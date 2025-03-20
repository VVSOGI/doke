import { EndpointDecoratorMetadata } from '../../../interfaces'
import { ApiDocsEndpoint } from '../../../decorators'
import { getMockData } from '../mocks'

export const DocsGetAllTodos = () => {
  const mock = getMockData('todo', 'getAllTodos')
  return ApiDocsEndpoint(mock)
}

export const DocsGetAllTodosByDates = () => {
  const mock = getMockData('todo', 'getAllTodosByDates')

  const metadata: EndpointDecoratorMetadata<{
    response: 'data' | 'total'
  }> = mock

  return ApiDocsEndpoint(metadata)
}

export const DocsCreateTodo = () => {
  const mock = getMockData('todo', 'createTodo')
  return ApiDocsEndpoint(mock)
}

export const DocsUpdateTodo = () => {
  const mock = getMockData('todo', 'updateTodo')

  const metadata: EndpointDecoratorMetadata<{
    params: 'id'
    body: 'title' | 'completed'
    response: 'id' | 'title' | 'completed' | 'createdAt' | 'updatedAt'
  }> = mock

  return ApiDocsEndpoint(metadata)
}

export const DocsDeleteTodo = () => {
  const mock = getMockData('todo', 'deleteTodo')

  const metadata: EndpointDecoratorMetadata<{
    params: 'id'
    response: 'success'
  }> = mock

  return ApiDocsEndpoint(metadata)
}
