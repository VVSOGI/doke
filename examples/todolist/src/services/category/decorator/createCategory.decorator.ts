import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { CreateCategoryValidator } from './validator'

export interface CreateRequest {
  body: any
}

export const ValidateCreateDTO = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest<CreateRequest>()
    return new CreateCategoryValidator(request).validate()
  } catch (err) {
    new TypiaExceptionHandler(err.response).handleValidationError()
  }
})
