import { todoController } from './todo'

const MOCKS = {
  todoController
}

type MockKeys = keyof typeof MOCKS

export const getControllersMockData = <T extends MockKeys>(mockName: T): (typeof MOCKS)[T] => {
  const mockData = MOCKS[mockName]
  if (!mockData) {
    throw new Error(`Mock data for '${mockName}' not found`)
  }
  return mockData
}
