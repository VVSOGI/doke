import typia from 'typia'
import { BadRequestException } from '@nestjs/common'
import { CustomIValidation } from 'src/common'
import { CreateCategoryDto } from '../../types'
import { CreateRequest } from '..'

export class CreateCategoryValidator {
  private body: CreateCategoryDto

  constructor(request: CreateRequest) {
    this.body = request.body
  }

  validate(): CreateCategoryDto | never {
    const checkValidate: CustomIValidation<CreateCategoryDto> = typia.validateEquals<CreateCategoryDto>(this.body)
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
