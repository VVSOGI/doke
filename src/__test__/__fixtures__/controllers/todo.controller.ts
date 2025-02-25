/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
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
  createTodo(@Body() dto: CreateTodoDto): TodoItem {
    return {} as TodoItem
  }

  @Patch(':id')
  @DocsUpdateTodo()
  updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto): TodoItem {
    return {} as TodoItem
  }

  @Delete(':id')
  @DocsDeleteTodo()
  deleteTodo(@Param('id') id: string): { success: boolean } {
    return { success: true }
  }
}
