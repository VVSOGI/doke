import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { GetTodolistCheckedValidator } from './validator'

export interface GetTodolistRequest {
  query: { checked?: any }
}

export const ValidateGetTodolistCheckedDTO = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest<GetTodolistRequest>()
    return new GetTodolistCheckedValidator(request).validate()
  } catch (err) {
    new TypiaExceptionHandler(err.response).handleValidationError()
  }
})
