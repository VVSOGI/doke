import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { CategoryIdParamsValidator } from '../validator'

export interface IdParamsRequest {
  params: {
    categoryId: string
  }
}

export const ValidateIdParamDTO = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest<IdParamsRequest>()
    return new CategoryIdParamsValidator(request).validate()
  } catch (err) {
    new TypiaExceptionHandler(err.response).handleValidationError()
  }
})
