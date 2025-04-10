import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 } from 'uuid'
import { TodolistRepository } from './todolist.repository'
import {
  CreateTodolistDto,
  TodolistResponseType,
  GetTodolistDtoFilters,
  UpdateTodolistDto,
  UpdateTodolistOrderDto,
  createTodolist,
  GetTodolistsResponseType,
  GetTodolistDatesDto
} from './types'
import { Todolist } from 'src/entities'
import { CategoryService } from '../category'

@Injectable()
export class TodolistService {
  constructor(
    private todolistRepository: TodolistRepository,
    private categoryService: CategoryService
  ) {}

  private async saveTodolist(todolist: Todolist): Promise<TodolistResponseType> {
    return this.todolistRepository.save(todolist)
  }

  private async findTodolistById(todolistId: string) {
    const target = await this.todolistRepository.findById(todolistId)

    if (target) {
      return target
    }

    throw new NotFoundException(`The todolist you're looking for doesn't exist.`)
  }

  async createTodolist(createTodolist: CreateTodolistDto): Promise<TodolistResponseType> {
    const lastTodo = await this.todolistRepository.findLastOrder(createTodolist.categoryId)
    const nextOrder = lastTodo ? lastTodo.order + 1 : 0

    const todolist: createTodolist = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      checked: false,
      order: nextOrder,
      ...createTodolist
    }
    const created = await this.todolistRepository.create(todolist)
    return this.saveTodolist(created)
  }

  async updateTodolist(updateTodolist: UpdateTodolistDto): Promise<TodolistResponseType> {
    const { id } = updateTodolist
    const target = await this.findTodolistById(id)
    const updated: Todolist = { ...target, ...updateTodolist, updatedAt: new Date() }
    this.categoryService.updateDate(target.categoryId)
    return this.saveTodolist(updated)
  }

  async updateTodolistOrder(updateTodolist: UpdateTodolistOrderDto[]) {
    for (let i = 0; i < updateTodolist.length; i++) {
      const target = await this.findTodolistById(updateTodolist[i].id)
      const updated: Todolist = { ...target, order: updateTodolist[i].order }
      this.saveTodolist(updated)
    }
    return {
      data: 'success'
    }
  }

  async getTodolists(): Promise<GetTodolistsResponseType> {
    return this.todolistRepository.findAll()
  }

  async getTodolistById(id: string) {
    const target = await this.findTodolistById(id)
    return target
  }

  async getTodolistsByCategoryId(filters: GetTodolistDtoFilters): Promise<GetTodolistsResponseType> {
    await this.categoryService.getCategoryById(filters.categoryId)
    const todolist = await this.todolistRepository.findByCategoryId(filters)
    return todolist
  }

  async getTodolistsByDate(categoryId: string, checked: GetTodolistDatesDto) {
    await this.categoryService.getCategoryById(categoryId)
    const todolists = await this.todolistRepository.findByDatesOrder(categoryId, checked)

    const dates: { date: string; todolists: Todolist[] }[] = []

    todolists.data.forEach((todolist) => {
      const date = todolist.updatedAt.toISOString().split('T')[0]
      const founded = dates.findIndex((item) => item.date === date)
      if (founded < 0) {
        dates.push({
          date,
          todolists: [todolist]
        })
      } else {
        dates[founded].todolists.push(todolist)
      }
    })

    return {
      data: dates,
      total: dates.length
    }
  }
}
