import { createTodo, deleteTodo, getAllTodos, updateTodo, getAllTodosByDates } from './todo'

const MOCKS = {
  todo: {
    getAllTodos,
    createTodo,
    updateTodo,
    getAllTodosByDates,
    deleteTodo
  }
}

type DomainKeys = keyof typeof MOCKS

type MethodKeys<D extends DomainKeys> = keyof (typeof MOCKS)[D]

type MockData<D extends DomainKeys, M extends MethodKeys<D>> = (typeof MOCKS)[D][M]

export const getMockData = <D extends DomainKeys, M extends MethodKeys<D>>(domain: D, method: M): MockData<D, M> => {
  const mockData = MOCKS[domain][method]
  if (!mockData) {
    throw new Error(`Mock data for '${domain}.${String(method)}' not found`)
  }
  return mockData
}
