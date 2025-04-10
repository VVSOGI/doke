import { tags } from 'typia'

export interface CreateTodolistDto {
  title: string & tags.MinLength<1>
  categoryId: string & tags.Format<'uuid'>
}

export interface createTodolist extends CreateTodolistDto {
  id: string
  checked: boolean
  createdAt: Date
  updatedAt: Date
  order: number
}
