import { tags } from 'typia'

export interface CategoryIdParamsDto {
  categoryId: string & tags.Format<'uuid'>
}

export type CategoryDeleteParamsDto = 'true' | 'false' | undefined
