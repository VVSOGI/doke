export interface TodoItem {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateTodoDto {
  title: string
}

export interface UpdateTodoDto {
  title?: string
  completed?: boolean
}
