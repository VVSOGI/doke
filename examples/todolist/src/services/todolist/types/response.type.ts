import { Todolist } from 'src/entities'
import { tags } from 'typia'

export interface GetTodolistsResponseType {
  data: TodolistResponseType[]
  total: number
}

export interface GetTodolistsByDatesResponseType {
  data: { date: string; todolists: Todolist[] }[]
  total: number
}

export interface UpdateTodolistsOrderResponseType {
  data: string
}

export interface TodolistResponseType {
  id: string & tags.Format<'uuid'>
  categoryId: string & tags.Format<'uuid'>
  title: string
  checked: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}
