import { tags } from 'typia'

export interface UpdateCategoryDto {
  title: string & tags.MinLength<3>
}
