import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TypiaExceptionHandler } from 'src/common'
import { CategoryDeleteCheckValidator } from './validator'

export interface GetDeletedCheckRequest {
  query: { deleted?: any }
}

export const ValidateDeletedCheckedDTO = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest<GetDeletedCheckRequest>()
    return new CategoryDeleteCheckValidator(request).validate()
  } catch (err) {
    new TypiaExceptionHandler(err.response).handleValidationError()
  }
})
