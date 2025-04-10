import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { CreateTodolistValidator } from './validator'
import { CreateTodolistDto } from '../types'

export interface CreateTodolistRequest {
  body: CreateTodolistDto | any
}

export const ValidateCreateTodolistDTO = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest<CreateTodolistRequest>()
    return new CreateTodolistValidator(request).validate()
  } catch (err) {
    new TypiaExceptionHandler(err.response).handleValidationError()
  }
})
