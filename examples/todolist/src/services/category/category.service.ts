import { v4 } from 'uuid'
import { tags } from 'typia'
import { Injectable, NotFoundException } from '@nestjs/common'
import { CategoryRepository } from './category.repository'
import {
  CategoryDeleteParamsDto,
  CreateCategory,
  DefaultCategoryResponseType,
  GetCategoriesResponseType,
  UpdateCategoryResponseType
} from './types'
import { Category } from 'src/entities'

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  private async saveCategory(category: Category) {
    return this.categoryRepository.save(category)
  }

  private async findCategoryById(categoryId: string) {
    const category = await this.categoryRepository.findById(categoryId)

    if (category) {
      return category
    }

    throw new NotFoundException(`The category you're looking for doesn't exist.`)
  }

  async createCategory(title: string): Promise<DefaultCategoryResponseType> {
    const category: CreateCategory = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      title
    }

    const created = await this.categoryRepository.create(category)
    return this.saveCategory(created)
  }

  async updateDate(categoryId: string) {
    const category = await this.findCategoryById(categoryId)
    const updated: Category = { ...category, updatedAt: new Date() }
    this.saveCategory(updated)
  }

  async getCategories(deleted: CategoryDeleteParamsDto): Promise<GetCategoriesResponseType> {
    let check: boolean | undefined

    switch (deleted) {
      case 'true':
        check = true
        break
      case 'false':
        check = false
        break
      default:
        check = undefined
        break
    }

    return this.categoryRepository.findAll(check)
  }

  async getCategoryById(categoryId: string): Promise<DefaultCategoryResponseType> {
    return await this.findCategoryById(categoryId)
  }

  async updateCategory(categoryId: string & tags.Format<'uuid'>, title: string): Promise<UpdateCategoryResponseType> {
    const category = await this.findCategoryById(categoryId)
    const updated = { ...category, title }
    return await this.saveCategory(updated)
  }

  async softDeleteCategoryById(categoryId: string): Promise<DefaultCategoryResponseType> {
    const category = await this.findCategoryById(categoryId)
    const updated: Category = { ...category, deleted: true }
    return this.saveCategory(updated)
  }
}
