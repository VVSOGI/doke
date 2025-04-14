import { Controller, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiDocsController } from 'doke-nest'
import {
  DocsCreateTodolist,
  DocsGetTodolist,
  DocsGetTodolistByDate,
  DocsGetTodolistById,
  DocsUpdateTodolist,
  DocsUpdateTodolistOrder
} from './decorator'

@ApiDocsController({
  description: 'Todolist management API endpoints',
  tags: ['Todolist']
})
@Controller('todolist')
export class TodolistController {
  constructor() {}

  @Post()
  @DocsCreateTodolist()
  async createTodolist(): Promise<object> {
    return {}
  }

  @Get()
  @DocsGetTodolist()
  async getTodolists(): Promise<object> {
    return {}
  }

  @Get(':categoryId')
  @DocsGetTodolistById()
  async getTodolistsByCategoryId(): Promise<object> {
    return {}
  }

  @Get('/dates/:categoryId')
  @DocsGetTodolistByDate()
  async getTodolistsByDate(@Query('checked') checked: string): Promise<object> {
    return { checked }
  }

  @Patch()
  @DocsUpdateTodolist()
  async updateTodo(): Promise<object> {
    return {}
  }

  @Patch('/order')
  @DocsUpdateTodolistOrder()
  async updateTodoOrder(): Promise<object> {
    return {}
  }
}
