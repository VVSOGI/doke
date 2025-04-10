import { tags } from 'typia'

export interface UpdateTodolistDto {
  id: string & tags.Format<'uuid'>
  title: string & tags.MinLength<1>
  checked: boolean
}

export interface UpdateTodolistOrderDto {
  id: string & tags.Format<'uuid'>
  order: number
}
