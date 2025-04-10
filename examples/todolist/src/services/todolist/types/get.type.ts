export type GetTodolistDto = 'true' | 'false' | undefined

export type GetTodolistDatesDto = 'true' | 'false' | 'all'

export interface GetTodolistDtoFilters {
  categoryId: string
  checked: boolean
}
