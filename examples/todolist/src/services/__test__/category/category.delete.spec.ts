import typia from 'typia'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { checkRequestValidate } from '../test.utils'
import { TypiaExceptionHandler } from 'src/common'
import { CategoryIdParamsDto, DefaultCategoryResponseType } from 'src/services/category/types'
import { CategoryController, CategoryService } from 'src/services/category'
import { CategoryIdParamsValidator } from 'src/services/common'

describe('Testing Create Category', () => {
  let controller: CategoryController
  let service: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            softDeleteCategoryById: jest.fn()
          }
        }
      ]
    }).compile()

    controller = module.get<CategoryController>(CategoryController)
    service = module.get<CategoryService>(CategoryService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('DELETE /soft/:categoryId', () => {
    it('should return DefaultCategoryResponseType when successed call DELETE api', async () => {
      const request: { params: CategoryIdParamsDto } = {
        params: {
          categoryId: '4f6c59f2-4978-4c4a-b276-5d3f8f1f8969'
        }
      }

      jest.spyOn(service, 'softDeleteCategoryById').mockResolvedValue({
        id: '4f6c59f2-4978-4c4a-b276-5d3f8f1f8969',
        title: 'test title',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const result: CategoryIdParamsDto = new CategoryIdParamsValidator(request).validate()
      const deleted = await controller.softDeleteCategoryById(result)

      expect(typia.equals<DefaultCategoryResponseType>(deleted)).toBe(true)
    })

    it('should throw error when if sent categoryId of a type other than UUID', async () => {
      const request: { params: CategoryIdParamsDto } = {
        params: {
          categoryId: '123'
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

    it('should throw error when if sent categoryId of a type other than UUID', async () => {
      const request: { params: CategoryIdParamsDto } = {
        params: {
          categoryId: ''
        }
      }

      const typiaError = await checkRequestValidate(CategoryIdParamsValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.response.message).toBe(`Received unexpected data 'categoryId' [MISSING DATA ERROR]`)
      }
    })
  })
})
