import typia from 'typia'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateTodolistValidator } from '../../todolist/decorator'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { checkRequestValidate } from '../test.utils'
import { TypiaExceptionHandler } from 'src/common'
import { TodolistResponseType } from 'src/services/todolist/types'
import { TodolistController, TodolistService } from 'src/services/todolist'

describe('Testing Create Todolist', () => {
  let controller: TodolistController
  let service: TodolistService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodolistController],
      providers: [
        {
          provide: TodolistService,
          useValue: {
            createTodolist: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<TodolistController>(TodolistController)
    service = module.get<TodolistService>(TodolistService)
  })

  describe('POST /todolist', () => {
    it('should return todolist when successed call POST api', async () => {
      const request = {
        body: {
          title: 'test title',
          categoryId: '89736e81-4068-43cd-8975-80358aa686ed'
        }
      }

      jest.spyOn(service, 'createTodolist').mockResolvedValue({
        ...request.body,
        id: 'd19826d4-80c0-43c2-bcee-294d8c78e11d',
        order: 1,
        checked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const result = new CreateTodolistValidator(request).validate()
      const created = await controller.createTodolist(result)
      expect(typia.equals<TodolistResponseType>(created)).toBe(true)
    })

    it('should throw error when sent wrong data', async () => {
      const request = {
        body: {
          title: 'test title',
          categoryId: '89736e81-4068-43cd-8975-80358aa686ed',
          hack: 'hack'
        }
      }

      const typiaError = await checkRequestValidate(CreateTodolistValidator, request)

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
          title: '',
          categoryId: '89736e81-4068-43cd-8975-80358aa686ed'
        }
      }

      const typiaError = await checkRequestValidate(CreateTodolistValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`You must enter at least three characters. [WRONG DATA SENT ERROR]`)
      }
    })

    it('should throw error when if sent categoryId of a type other than UUID', async () => {
      const request = {
        body: {
          title: 'test title',
          categoryId: '123'
        }
      }

      const typiaError = await checkRequestValidate(CreateTodolistValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`Received unmatched data 'categoryId' [INVALID UUID TYPE ERROR]`)
      }
    })

    it('should throw error when forget sent essential data', async () => {
      const request = {
        body: {
          title: 'test title'
        }
      }

      const typiaError = await checkRequestValidate(CreateTodolistValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.response.message).toBe(`Received unexpected data 'categoryId' [MISSING DATA ERROR]`)
      }
    })
  })
})
