import typia from 'typia'
import { BadRequestException } from '@nestjs/common'
import { CustomIValidation } from 'src/common'
import { GetTodolistDto } from '../../types'
import { GetTodolistRequest } from '..'

/**
 * @description
 * GetTodolist의 typia validate 미들웨어
 */
export class GetTodolistCheckedValidator {
  private checked: GetTodolistDto

  constructor(request: GetTodolistRequest) {
    if (this.insertQueryButNoContents(request.query.checked)) {
      this.checked = ' ' as any
    } else {
      this.checked = request.query.checked
    }
  }

  private insertQueryButNoContents(checked: any) {
    if (checked === '') {
      return true
    }

    return false
  }

  validate(): GetTodolistDto | never {
    const checkValidate: CustomIValidation<GetTodolistDto> = typia.validateEquals<GetTodolistDto>(this.checked)
    const { success, errors } = checkValidate

    if (success) {
      return this.checked
    }

    throw new BadRequestException(errors[0])
  }
}
