import typia from 'typia'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { UpdateCategoryValidator } from '../../category/decorator'
import { checkRequestValidate } from '../test.utils'
import { TypiaExceptionHandler } from 'src/common'
import { UpdateCategoryResponseType } from 'src/services/category/types'
import { CategoryController, CategoryService } from 'src/services/category'
import { CategoryIdParamsValidator } from 'src/services/common'

describe('Testing Update Category', () => {
  let controller: CategoryController
  let service: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            updateCategory: jest.fn()
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

  describe(`PATCH /category/:categoryId`, () => {
    it('should return CreateCategoryDto to controller', async () => {
      const request = {
        body: {
          title: 'test title'
        },
        params: {
          categoryId: '44acf95a-70a5-4141-aa0e-bc32f7997cbe'
        }
      }
      jest.spyOn(service, 'updateCategory').mockResolvedValue({
        ...request.body,
        id: request.params.categoryId,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const body = new UpdateCategoryValidator(request).validate()
      const idParams = new CategoryIdParamsValidator(request).validate()

      const updated = await controller.updateCategory(idParams, body)
      expect(typia.equals<UpdateCategoryResponseType>(updated)).toBe(true)
    })

    it('should throw error when sent wrong data in body validator', async () => {
      const request = {
        body: {
          title: 'test title',
          hack: 'hack'
        }
      }

      const typiaError = await checkRequestValidate(UpdateCategoryValidator, request)

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
          title: ''
        }
      }

      const typiaError = await checkRequestValidate(UpdateCategoryValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`You must enter at least three characters. [WRONG DATA SENT ERROR]`)
      }
    })

    it('should throw error when forget sent essential data in body validator', async () => {
      const request = {
        body: {}
      }

      const typiaError = await checkRequestValidate(UpdateCategoryValidator, request)

      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.response.message).toBe(`Received unexpected data 'title' [MISSING DATA ERROR]`)
      }
    })

    it('should throw error when sent wrong data in params validator', async () => {
      const request = {
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

    it('should throw error when forget sent essential data in params validator', async () => {
      const request = {
        params: {}
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
