import typia from 'typia'
import { BadRequestException } from '@nestjs/common'
import { CustomIValidation } from 'src/common'
import { UpdateTodolistDto } from '../../types'
import { UpdateTodolistRequest } from '..'

/**
 * @description
 * UpdateTodolist의 typia validate 미들웨어
 * - request의 body가 UpdateTodolistDto와 일치하지 않으면 에러를 뱉음.
 */
export class UpdateTodolistValidator {
  private body: UpdateTodolistDto

  constructor(request: UpdateTodolistRequest) {
    this.body = request.body
  }

  validate(): UpdateTodolistDto | never {
    const checkValidate: CustomIValidation<UpdateTodolistDto> = typia.validateEquals<UpdateTodolistDto>(this.body)
    const { success, errors } = checkValidate

    if (success) {
      return this.body
    }

    if (errors[0].expected === 'string & MinLength<1>') {
      errors[0].messages = 'You must enter at least three characters.'
    }

    throw new BadRequestException(errors[0])
  }
}
