import { ObjectLiteral, Repository } from 'typeorm'
import { jest } from '@jest/globals'

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>
}

export type MockRepository<T extends ObjectLiteral> = Partial<Record<keyof Repository<T>, jest.Mock>>

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity: any[]) => entity)
}))

export const checkRequestValidate = async (Validator: any, request: any) => {
  let typiaError

  try {
    new Validator(request).validate()
  } catch (err) {
    typiaError = err
  }

  return typiaError
}
