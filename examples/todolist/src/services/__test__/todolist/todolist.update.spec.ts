import typia from 'typia'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { UpdateTodolistOrderValidator, UpdateTodolistValidator } from '../../todolist/decorator'
import { checkRequestValidate } from '../test.utils'
import { UpdateTodolistDto, UpdateTodolistsOrderResponseType } from 'src/services/todolist/types'
import { TodolistController, TodolistService } from 'src/services/todolist'

describe('Testing Update Todolist', () => {
  let controller: TodolistController
  let service: TodolistService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
      providers: [
        {
          provide: TodolistService,
          useValue: {
            updateTodolist: jest.fn(),
            updateTodolistOrder: jest.fn()
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

  describe('PATCH /todolist', () => {
    it('should return todolist when successed call patch api', async () => {
      const request = {
        body: {
          id: '89736e81-4068-43cd-8975-80358aa686ed',
          title: 'test title',
          checked: true
        }
      }

      jest.spyOn(service, 'updateTodolist').mockResolvedValue({
        ...request.body,
        categoryId: '1',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const result = new UpdateTodolistValidator(request).validate()
      const updated = await controller.updateTodo(result)

      expect(updated.checked).toBe(true)
    })

    it('should return UpdateTodolistDto to controller', async () => {
      const request = {
        body: {
          id: '89736e81-4068-43cd-8975-80358aa686ed',
          title: 'test title',
          checked: true
        }
      }

      const result = new UpdateTodolistValidator(request).validate()
      expect(typia.equals<UpdateTodolistDto>(result)).toBe(true)
    })

    it('should throw error when sent wrong data', async () => {
      const request = {
        body: {
          id: '89736e81-4068-43cd-8975-80358aa686ed',
          title: 'test title',
          checked: false,
          hack: 'hack'
        }
      }

      const typiaError = await checkRequestValidate(UpdateTodolistValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unexpected data 'hack' [WRONG DATA SENT ERROR]`)
      }
    })

    it('should throw error when if sent three characters or less', async () => {
      const request = {
        body: {
          id: '89736e81-4068-43cd-8975-80358aa686ed',
          title: '',
          checked: false
        }
      }

      const typiaError = await checkRequestValidate(UpdateTodolistValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`You must enter at least three characters. [WRONG DATA SENT ERROR]`)
      }
    })

    it('should throw error when forget sent essential data', async () => {
      const request = {
        body: {
          id: '89736e81-4068-43cd-8975-80358aa686ed',
          title: 'test title'
        }
      }

      const typiaError = await checkRequestValidate(UpdateTodolistValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.response.message).toBe(`Received unexpected data 'checked' [MISSING DATA ERROR]`)
      }
    })

    it('should throw error when if sent id of a type other than UUID', async () => {
      const request = {
        body: {
          id: '123',
          title: 'test title',
          checked: false
        }
      }

      const typiaError = await checkRequestValidate(UpdateTodolistValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unmatched data 'id' [INVALID UUID TYPE ERROR]`)
      }
    })
  })

  describe('PATCH /todolist/order', () => {
    it('should return UpdateTodolistOrderDto to controller', async () => {
      const request = {
        body: [
          {
            id: '89736e81-4068-43cd-8975-80358aa686ed',
            order: 0
          }
        ]
      }

      jest.spyOn(service, 'updateTodolistOrder').mockResolvedValue({
        data: 'success'
      })

      const validateResult = new UpdateTodolistOrderValidator(request).validate()
      const result = await controller.updateTodoOrder(validateResult)

      expect(typia.equals<UpdateTodolistsOrderResponseType>(result)).toBe(true)
    })

    it('should throw error when sent wrong data', async () => {
      const request = {
        body: [
          {
            id: '89736e81-4068-43cd-8975-80358aa686ed',
            order: 0,
            hack: ''
          }
        ]
      }

      const typiaError = await checkRequestValidate(UpdateTodolistOrderValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unexpected data 'hack' [WRONG DATA SENT ERROR]`)
      }
    })

    it('should throw error when sent wrong data type', async () => {
      const request = {
        body: [
          {
            id: '89736e81-4068-43cd-8975-80358aa686ed',
            order: '10'
          }
        ]
      }

      const typiaError = await checkRequestValidate(UpdateTodolistOrderValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unexpected data 'order' [INVALID TYPE ERROR]`)
      }
    })

    it('should throw error when if sent id of a type other than UUID', async () => {
      const request = {
        body: [
          {
            id: '123',
            order: '10'
          }
        ]
      }

      const typiaError = await checkRequestValidate(UpdateTodolistOrderValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unmatched data 'id' [INVALID UUID TYPE ERROR]`)
      }
    })

    it('should throw error when forget sent essential data', async () => {
      const request = {
        body: [
          {
            id: '89736e81-4068-43cd-8975-80358aa686ed'
          }
        ]
      }

      const typiaError = await checkRequestValidate(UpdateTodolistOrderValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.response.message).toBe(`Received unexpected data 'order' [MISSING DATA ERROR]`)
      }
    })
  })
})
