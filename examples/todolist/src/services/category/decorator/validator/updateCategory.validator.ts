import typia from 'typia'
import { BadRequestException } from '@nestjs/common'
import { CustomIValidation } from 'src/common'
import { UpdateCategoryDto } from '../../types'
import { UpdateRequest } from '..'

export class UpdateCategoryValidator {
  private body: UpdateCategoryDto

  constructor(request: UpdateRequest) {
    this.body = request.body
  }

  validate(): UpdateCategoryDto | never {
    const checkValidate: CustomIValidation<UpdateCategoryDto> = typia.validateEquals<UpdateCategoryDto>(this.body)
    const { success, errors } = checkValidate

    if (success) {
      return this.body
    }

    if (errors[0].expected === 'string & MinLength<3>') {
      errors[0].messages = 'You must enter at least three characters.'
    }

    throw new BadRequestException(errors[0])
  }
}
