import typia from 'typia'
import { Test, TestingModule } from '@nestjs/testing'
import { TodolistController, TodolistService } from '../../todolist'
import { Todolist } from 'src/entities'
import { GetTodolistCheckedValidator } from '../../todolist/decorator'
import { BadRequestException } from '@nestjs/common'
import { checkRequestValidate } from '../test.utils'
import { TypiaExceptionHandler } from 'src/common'
import { GetTodolistsResponseType, TodolistResponseType } from 'src/services/todolist/types'
import { CategoryIdParamsValidator } from 'src/services/common'

describe('Testing Get Todolist', () => {
  let controller: TodolistController
  let service: TodolistService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
      providers: [
        {
          provide: TodolistService,
          useValue: {
            getTodolists: jest.fn(),
            getTodolistsByCategoryId: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<TodolistController>(TodolistController)
    service = module.get<TodolistService>(TodolistService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /todolist', () => {
    it('should return GetTodolistsResponseType', async () => {
      const mockTodolist: TodolistResponseType[] = [
        {
          id: '03f3a6ba-77e9-4e64-accc-f2d3b86dd70a',
          categoryId: '72b2b482-b257-48d0-a89a-f4225b4f1ff4',
          order: 0,
          title: 'mock todolist title 1',
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'bfa7dc79-693d-431a-9eca-d65fc4dde7d2',
          categoryId: '72f6e270-f7dd-418b-b932-0a7f187a211e',
          order: 1,
          title: 'mock todolist title 2',
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      jest.spyOn(service, 'getTodolists').mockResolvedValue({
        data: mockTodolist,
        total: mockTodolist.length
      })

      const result = await controller.getTodolists()
      expect(typia.equals<GetTodolistsResponseType>(result)).toBe(true)
    })

    it('should return empty array', async () => {
      const mockTodolist: Todolist[] = []

      jest.spyOn(service, 'getTodolists').mockResolvedValue({
        data: mockTodolist,
        total: mockTodolist.length
      })

      const result = (await controller.getTodolists()).total
      expect(result).toBe(0)
    })

    it('when request query with dto that not matched', async () => {
      const request = {
        query: {
          checked: 'tru'
        }
      }

      const typiaError = await checkRequestValidate(GetTodolistCheckedValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unexpected data '(\"false\" | \"true\" | undefined)' [INVALID QUERY DATA ERROR]`)
      }
    })
  })

  describe('GET /todolist/:categoryId', () => {
    it('should return GetTodolistsResponseType', async () => {
      const request = {
        params: {
          categoryId: '32e553e1-455f-4713-be2b-b71322cf5047'
        },
        query: {
          checked: 'false'
        }
      }

      const mockTodolists: TodolistResponseType[] = [
        {
          id: 'bfa7dc79-693d-431a-9eca-d65fc4dde7d2',
          categoryId: '72f6e270-f7dd-418b-b932-0a7f187a211e',
          order: 1,
          title: 'mock todolist title 2',
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      jest.spyOn(service, 'getTodolistsByCategoryId').mockResolvedValue({
        data: mockTodolists,
        total: mockTodolists.length
      })

      const idParams = new CategoryIdParamsValidator(request).validate()
      const checkedParams = new GetTodolistCheckedValidator(request).validate()
      const result = await controller.getTodolistsByCategoryId(idParams, checkedParams)

      expect(typia.equals<GetTodolistsResponseType>(result)).toBe(true)
    })

    it('should throw error when if sent id of a type other than UUID', async () => {
      const request = {
        params: {
          categoryId: '123'
        },
        query: {
          checked: 'false'
        }
      }

      const typiaError = await checkRequestValidate(CategoryIdParamsValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unmatched data 'categoryId' [INVALID UUID TYPE ERROR]`)
      }
    })

    it('should throw error when if sent wrong data that query checked', async () => {
      const request = {
        params: {
          categoryId: '32e553e1-455f-4713-be2b-b71322cf5047'
        },
        query: {
          checked: ''
        }
      }

      const typiaError = await checkRequestValidate(GetTodolistCheckedValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unexpected data '(\"false\" | \"true\" | undefined)' [INVALID QUERY DATA ERROR]`)
      }
    })
  })

  describe('GET /todolist/dates/:categoryId', () => {
    it('should return GetTodolistsResponseType', async () => {
      const request = {
        params: {
          categoryId: '32e553e1-455f-4713-be2b-b71322cf5047'
        }
      }

      const mockTodolists: TodolistResponseType[] = [
        {
          id: 'bfa7dc79-693d-431a-9eca-d65fc4dde7d2',
          categoryId: '72f6e270-f7dd-418b-b932-0a7f187a211e',
          order: 1,
          title: 'mock todolist title 2',
          checked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      jest.spyOn(service, 'getTodolistsByCategoryId').mockResolvedValue({
        data: mockTodolists,
        total: mockTodolists.length
      })

      const idParams = new CategoryIdParamsValidator(request).validate()
      const result = await controller.getTodolistsByCategoryId(idParams)

      expect(typia.equals<GetTodolistsResponseType>(result)).toBe(true)
    })

    it('should throw error when if sent id of a type other than UUID', async () => {
      const request = {
        params: {
          categoryId: '111'
        }
      }

      const typiaError = await checkRequestValidate(CategoryIdParamsValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unmatched data 'categoryId' [INVALID UUID TYPE ERROR]`)
      }
    })
  })
})
