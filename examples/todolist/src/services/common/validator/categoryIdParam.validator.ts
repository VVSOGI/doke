import typia from 'typia'
import { BadRequestException } from '@nestjs/common'
import { CustomIValidation } from 'src/common'
import { CategoryIdParamsDto, IdParamsRequest } from '..'

export class CategoryIdParamsValidator {
  private params: CategoryIdParamsDto

  constructor(request: IdParamsRequest) {
    this.params = request.params
  }

  validate(): any {
    const checkValidate: CustomIValidation<CategoryIdParamsDto> = typia.validateEquals<CategoryIdParamsDto>({
      categoryId: this.params.categoryId
    })
    const { success, errors } = checkValidate

    if (success) {
      return this.params
    }

    throw new BadRequestException(errors[0])
  }
}
