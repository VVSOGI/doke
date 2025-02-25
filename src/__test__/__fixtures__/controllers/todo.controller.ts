/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { DocsTodoController, DocsGetAllTodos, DocsCreateTodo, DocsUpdateTodo, DocsDeleteTodo } from '../decorators'
import { CreateTodoDto, TodoItem, UpdateTodoDto } from '../types'

@Controller('todo')
@DocsTodoController()
export class TodoController {
  @Get()
  @DocsGetAllTodos()
  getAllTodos(): TodoItem[] {
    return []
  }

  @Post()
  @DocsCreateTodo()
  createTodo(dto: CreateTodoDto): TodoItem {
    return {} as TodoItem
  }

  @Patch()
  @DocsUpdateTodo()
  updateTodo(id: string, dto: UpdateTodoDto): TodoItem {
    return {} as TodoItem
  }

  @Delete()
  @DocsDeleteTodo()
  deleteTodo(id: string): { success: boolean } {
    return { success: true }
  }
}
