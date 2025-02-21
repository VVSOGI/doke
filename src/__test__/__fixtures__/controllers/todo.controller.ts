/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocsTodoController, DocsGetAllTodos, DocsCreateTodo, DocsUpdateTodo, DocsDeleteTodo } from '../mocks'
import { CreateTodoDto, TodoItem, UpdateTodoDto } from '../types'

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
