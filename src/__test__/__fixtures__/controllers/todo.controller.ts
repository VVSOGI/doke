/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common'
import { DocsTodoController, DocsGetAllTodos, DocsCreateTodo, DocsUpdateTodo, DocsDeleteTodo } from '../decorators'
import { CreateTodoDto, TodoItem, UpdateTodoDto } from '../types'

@Controller('todo')
@DocsTodoController()
export class TodoController {
  @DocsGetAllTodos()
  getAllTodos(): TodoItem[] {
    return []
  }

  @DocsCreateTodo()
  createTodo(dto: CreateTodoDto): TodoItem {
    return {} as TodoItem
  }

  @DocsUpdateTodo()
  updateTodo(id: string, dto: UpdateTodoDto): TodoItem {
    return {} as TodoItem
  }

  @DocsDeleteTodo()
  deleteTodo(id: string): { success: boolean } {
    return { success: true }
  }
}
