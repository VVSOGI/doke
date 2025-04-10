import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { UpdateTodolistOrderValidator } from './validator'
import { UpdateTodolistRequest } from './updateTodolist.decorator'

export const ValidateUpdateTodolistOrderDTO = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest<UpdateTodolistRequest>()
    return new UpdateTodolistOrderValidator(request).validate()
  } catch (err) {
    new TypiaExceptionHandler(err.response).handleValidationError()
  }
})
