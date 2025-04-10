import { tags } from 'typia'

export interface GetCategoriesResponseType {
  data: DefaultCategoryResponseType[]
  total: number
}

export interface DefaultCategoryResponseType {
  id: string & tags.Format<'uuid'>
  title: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
}

export interface UpdateCategoryResponseType {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  deleted: boolean
}
