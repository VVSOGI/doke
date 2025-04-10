import { tags } from 'typia'

export interface CreateCategoryDto {
  title: string & tags.MinLength<3>
}

export interface CreateCategory {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
}
