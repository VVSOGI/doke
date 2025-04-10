import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiDocsController } from 'doke-nest'
import { CategoryService } from './category.service'
import {
  CategoryDeleteParamsDto,
  CategoryIdParamsDto,
  CreateCategoryDto,
  DefaultCategoryResponseType,
  GetCategoriesResponseType,
  UpdateCategoryDto,
  UpdateCategoryResponseType
} from './types'
import { ValidateCreateDTO, ValidateDeletedCheckedDTO, ValidateUpdateDTO } from './decorator'
import { DocsCreateCategory, DocsGetCategory, DocsUpdateCategory, DocsGetCategoryById, DocsDeleteCategory } from './decorator/custom-docs'
import { ValidateIdParamDTO } from '../common'

@ApiDocsController({
  description: 'Category management API endpoints',
  tags: ['Category']
})
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @DocsCreateCategory()
  async createCategory(@ValidateCreateDTO() createCategoryDto: CreateCategoryDto): Promise<DefaultCategoryResponseType> {
    const { title } = createCategoryDto
    return this.categoryService.createCategory(title)
  }

  @Get()
  @DocsGetCategory()
  async getCategories(@ValidateDeletedCheckedDTO() categoryDeleteParamsDto: CategoryDeleteParamsDto): Promise<GetCategoriesResponseType> {
    return this.categoryService.getCategories(categoryDeleteParamsDto)
  }

  @Get(':categoryId')
  @DocsGetCategoryById()
  async getCategoryById(@ValidateIdParamDTO() getCategoryDto: CategoryIdParamsDto): Promise<DefaultCategoryResponseType> {
    const { categoryId } = getCategoryDto
    return this.categoryService.getCategoryById(categoryId)
  }

  @Patch(':categoryId')
  @DocsUpdateCategory()
  async updateCategory(
    @ValidateIdParamDTO() idParamsDto: CategoryIdParamsDto,
    @ValidateUpdateDTO() updateCategoryDto: UpdateCategoryDto
  ): Promise<UpdateCategoryResponseType> {
    const { categoryId } = idParamsDto
    const { title } = updateCategoryDto
    return this.categoryService.updateCategory(categoryId, title)
  }

  @Delete('/soft/:categoryId')
  @DocsDeleteCategory()
  async softDeleteCategoryById(@ValidateIdParamDTO() deleteCategoryDto: CategoryIdParamsDto): Promise<DefaultCategoryResponseType> {
    const { categoryId } = deleteCategoryDto
    return this.categoryService.softDeleteCategoryById(categoryId)
  }
}
