import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { UpdateTodolistValidator } from './validator'

export interface UpdateTodolistRequest {
  body: any
}

export const ValidateUpdateTodolistDto = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest<UpdateTodolistRequest>()
    return new UpdateTodolistValidator(request).validate()
  } catch (err) {
    new TypiaExceptionHandler(err.response).handleValidationError()
  }
})
