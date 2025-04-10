import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/entities'
import { Repository } from 'typeorm'
import { CreateCategory, GetCategoriesResponseType } from './types'

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async save(category: Category) {
    return await this.categoryRepository.save(category)
  }

  async create(category: CreateCategory) {
    const created = this.categoryRepository.create(category)
    return created
  }

  async findAll(deleted?: boolean): Promise<GetCategoriesResponseType> {
    const [data, total] = await this.categoryRepository.findAndCount({
      order: {
        createdAt: 'desc'
      },
      where: {
        deleted
      }
    })
    return {
      data,
      total
    }
  }

  async findById(categoryId: string) {
    const category = await this.categoryRepository.findOneBy({ id: categoryId })
    return category
  }

  async delete(category: Category) {
    return await this.categoryRepository.delete(category)
  }
}
