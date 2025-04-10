import { tags } from 'typia'

export interface CategoryIdParamsDto {
  categoryId: string & tags.Format<'uuid'>
}
