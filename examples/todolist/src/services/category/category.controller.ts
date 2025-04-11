import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiDocsController } from 'doke-nest'
import { DocsCreateCategory, DocsGetCategory, DocsUpdateCategory, DocsGetCategoryById, DocsDeleteCategory } from './decorator'

@ApiDocsController({
  description: 'Category management API endpoints',
  tags: ['Category']
})
@Controller('category')
export class CategoryController {
  @Post()
  @DocsCreateCategory()
  async createCategory(): Promise<string> {
    return ''
  }

  @Get()
  @DocsGetCategory()
  async getCategories(): Promise<string> {
    return ''
  }

  @Get(':categoryId')
  @DocsGetCategoryById()
  async getCategoryById(): Promise<string> {
    return ''
  }

  @Patch(':categoryId')
  @DocsUpdateCategory()
  async updateCategory(): Promise<string> {
    return ''
  }

  @Delete('/soft/:categoryId')
  @DocsDeleteCategory()
  async softDeleteCategoryById(): Promise<string> {
    return ''
  }
}
