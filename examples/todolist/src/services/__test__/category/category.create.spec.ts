import typia from 'typia'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { CreateCategoryValidator } from '../../category/decorator'
import { checkRequestValidate } from '../test.utils'
import { TypiaExceptionHandler } from 'src/common'
import { DefaultCategoryResponseType } from 'src/services/category/types'
import { CategoryController, CategoryService } from 'src/services/category'

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
            createCategory: jest.fn()
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

  describe('POST /category', () => {
    it('should return CreateCategoryDto to controller', async () => {
      const request = {
        body: {
          title: 'test title'
        }
      }

      jest.spyOn(service, 'createCategory').mockResolvedValue({
        ...request.body,
        id: '44acf95a-70a5-4141-aa0e-bc32f7997cbe',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const result = new CreateCategoryValidator(request).validate()
      const created = await controller.createCategory(result)

      expect(typia.equals<DefaultCategoryResponseType>(created)).toBe(true)
    })

    it('should throw error when sent wrong data', async () => {
      const request = {
        body: {
          title: 'test title',
          hack: 'hack'
        }
      }

      const typiaError = await checkRequestValidate(CreateCategoryValidator, request)
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

      const typiaError = await checkRequestValidate(CreateCategoryValidator, request)
      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException)
        expect(err.response.message).toBe(`You must enter at least three characters. [WRONG DATA SENT ERROR]`)
      }
    })

    it('should throw error when forget sent essential data', async () => {
      const request = {
        body: {}
      }

      const typiaError = await checkRequestValidate(CreateCategoryValidator, request)
      try {
        new TypiaExceptionHandler(typiaError.response).handleValidationError()
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.response.message).toBe(`Received unexpected data 'title' [MISSING DATA ERROR]`)
      }
    })
  })
})
