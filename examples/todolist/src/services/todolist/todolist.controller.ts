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
  async createTodolist(): Promise<string> {
    return ''
  }

  @Get()
  @DocsGetTodolist()
  async getTodolists(): Promise<string> {
    return ''
  }

  @Get(':categoryId')
  @DocsGetTodolistById()
  async getTodolistsByCategoryId(): Promise<string> {
    return ''
  }

  @Get('/dates/:categoryId')
  @DocsGetTodolistByDate()
  async getTodolistsByDate(@Query('checked') checked: string): Promise<string> {
    return checked
  }

  @Patch()
  @DocsUpdateTodolist()
  async updateTodo(): Promise<string> {
    return ''
  }

  @Patch('/order')
  @DocsUpdateTodolistOrder()
  async updateTodoOrder(): Promise<string> {
    return ''
  }
}
