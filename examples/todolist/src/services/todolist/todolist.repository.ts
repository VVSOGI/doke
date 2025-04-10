import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Todolist } from 'src/entities'
import { Repository } from 'typeorm'
import { GetTodolistDatesDto, GetTodolistDtoFilters, GetTodolistsResponseType, createTodolist } from './types'

@Injectable()
export class TodolistRepository {
  constructor(
    @InjectRepository(Todolist)
    private todolistRepository: Repository<Todolist>
  ) {}

  async save(todolist: Todolist) {
    return await this.todolistRepository.save(todolist)
  }

  async create(todolist: createTodolist) {
    const created = this.todolistRepository.create(todolist)
    return created
  }

  async findLastOrder(categoryId: string) {
    return await this.todolistRepository.findOne({
      where: { categoryId },
      order: { order: 'DESC' }
    })
  }

  async findAll(): Promise<GetTodolistsResponseType> {
    const [data, total] = await this.todolistRepository.findAndCount({
      order: {
        createdAt: 'desc'
      }
    })
    return {
      data,
      total
    }
  }

  async findById(id: string) {
    const todo = await this.todolistRepository.findOneBy({ id })
    return todo
  }

  async findByCategoryId(filters: GetTodolistDtoFilters) {
    const { categoryId, checked } = filters
    const [data, total] = await this.todolistRepository.findAndCount({ where: { categoryId, checked }, order: { order: 'ASC' } })
    return {
      data,
      total
    }
  }

  async findByDatesOrder(categoryId: string, checked: GetTodolistDatesDto) {
    let isChecked: boolean | undefined = undefined
    if (checked === 'true' || !checked) {
      isChecked = true
    } else if (checked === 'false') {
      isChecked = false
    }
    const [data, total] = await this.todolistRepository.findAndCount({
      where: { categoryId, checked: isChecked },
      order: { updatedAt: 'DESC' }
    })
    return {
      data,
      total
    }
  }
}
