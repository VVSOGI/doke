import typia from 'typia'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'
import { CategoryController, CategoryService } from '../../category'
import { checkRequestValidate } from '../test.utils'
import { TypiaExceptionHandler } from 'src/common'
import { DefaultCategoryResponseType, GetCategoriesResponseType } from 'src/services/category/types'
import { CategoryIdParamsValidator } from 'src/services/common'

describe('Testing Get Category', () => {
  let controller: CategoryController
  let service: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getCategories: jest.fn(),
            getCategoryById: jest.fn()
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

  describe('GET /category', () => {
    it('should return GetCategoriesResponseType', async () => {
      const mockCategories: DefaultCategoryResponseType[] = [
        {
          id: '74cea9ab-6fe5-4a64-a3dd-ed91631bbcd6',
          title: 'Test Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false
        },
        {
          id: '4fdf955a-5afe-4bbe-91e6-4f2d95861f6f',
          title: 'Test Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deleted: false
        }
      ]

      jest.spyOn(service, 'getCategories').mockResolvedValue({
        data: mockCategories,
        total: mockCategories.length
      })

      const result = await controller.getCategories('false')
      expect(typia.equals<GetCategoriesResponseType>(result)).toBe(true)
    })

    it('should return empty array', async () => {
      jest.spyOn(service, 'getCategories').mockResolvedValue({
        data: [],
        total: 0
      })
      const result = (await controller.getCategories('false')).data
      expect(result.length).toBe(0)
    })
  })

  describe('GET /category/:categoryId', () => {
    it('should return DefaultCategoryResponseType', async () => {
      const request = {
        params: {
          categoryId: '32e553e1-455f-4713-be2b-b71322cf5047'
        }
      }

      const mockCategory: DefaultCategoryResponseType = {
        id: request.params.categoryId,
        title: 'Test Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false
      }

      jest.spyOn(service, 'getCategoryById').mockResolvedValue(mockCategory)

      const params = new CategoryIdParamsValidator(request).validate()
      const result = await controller.getCategoryById(params)

      expect(typia.equals<DefaultCategoryResponseType>(result)).toBe(true)
    })

    it('should throw error when categoryId not matched uuid type', async () => {
      const request = {
        params: {
          categoryId: '1232'
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
