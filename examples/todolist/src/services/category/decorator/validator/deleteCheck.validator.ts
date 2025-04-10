import typia from 'typia'
import { BadRequestException } from '@nestjs/common'
import { CustomIValidation } from 'src/common'
import { CategoryDeleteParamsDto } from '../../types'
import { GetDeletedCheckRequest } from '..'

export class CategoryDeleteCheckValidator {
  private deleted: CategoryDeleteParamsDto

  constructor(request: GetDeletedCheckRequest) {
    if (this.insertQueryButNoContents(request.query.deleted)) {
      this.deleted = ' ' as any
    } else {
      this.deleted = request.query.deleted
    }
  }

  private insertQueryButNoContents(deleted: any) {
    if (deleted === '') {
      return true
    }

    return false
  }

  validate(): CategoryDeleteParamsDto | never {
    const checkValidate: CustomIValidation<CategoryDeleteParamsDto> = typia.validateEquals<CategoryDeleteParamsDto>(this.deleted)
    const { success, errors } = checkValidate

    if (success) {
      return this.deleted
    }

    throw new BadRequestException(errors[0])
  }
}
