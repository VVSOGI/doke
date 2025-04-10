import { BadRequestException, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common'
import { CustomIValidation } from './types/typia-validation.type'

export class TypiaExceptionHandler {
  private readonly pattern = /\$input\./g
  private readonly error: CustomIValidation.IError

  constructor(error: CustomIValidation.IError) {
    this.error = error
  }

  private isNonDtoType(expected: any): boolean {
    return expected === 'undefined'
  }

  private isMissingData(expected: any, value: any): boolean {
    return expected && !value
  }

  private isInvalidDataType(expected: any, value: any): boolean {
    return expected !== typeof value
  }

  private isNotUUIDType(expected: any): boolean {
    const reg = /uuid/i
    return reg.test(expected)
  }

  private isNotMatchedNarrowingType(expected: any, value: string) {
    const validExpects = expected
      .match(/("?\w+"?)/g)
      .filter((item) => item !== '|')
      .map((item) => item.replace(/"/g, '')) as Array<any>

    if (validExpects.length) {
      const foundValue = validExpects.find((expect) => expect === value)
      return !foundValue
    }

    return true
  }

  private isExpectedUnionType(expected: any) {
    const unionTypeRegex = /^\(((\s*"[^"]+"\s*|\s*\w+\s*)(\s*\|\s*(\s*"[^"]+"\s*|\s*\w+\s*))*)\)$/
    return unionTypeRegex.test(expected)
  }

  handleValidationError(): never {
    const { expected, value, path, messages } = this.error
    const cleanPath = path.replace(this.pattern, '')

    if (messages) {
      throw new BadRequestException(`${messages} [WRONG DATA SENT ERROR]`)
    }

    if (this.isNonDtoType(expected)) {
      throw new BadRequestException(`Received unexpected data '${cleanPath}' [WRONG DATA SENT ERROR]`)
    }

    if (this.isMissingData(expected, value)) {
      throw new NotFoundException(`Received unexpected data '${cleanPath}' [MISSING DATA ERROR]`)
    }

    if (this.isExpectedUnionType(expected) && this.isNotMatchedNarrowingType(expected, value)) {
      throw new BadRequestException(`Received unexpected data '${expected}' [INVALID QUERY DATA ERROR]`)
    }

    if (this.isNotUUIDType(expected)) {
      throw new BadRequestException(`Received unmatched data '${cleanPath}' [INVALID UUID TYPE ERROR]`)
    }

    if (this.isInvalidDataType(expected, value)) {
      throw new BadRequestException(`Received unexpected data '${cleanPath}' [INVALID TYPE ERROR]`)
    }

    Logger.error(this.error)
    Logger.error(`Not acceptable error [NOT ACCEPTABLE ERROR]`)
    throw new NotAcceptableException()
  }
}
