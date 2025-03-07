export class CommonUtils {
  static camelToPascalCase(word: string) {
    if (!word) return word
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  static pascalCaseWithSpaces(word: string) {
    if (!word) return word

    return this.camelToPascalCase(word).replace(/([A-Z])/g, (match: string, group: string, offset: number): string => {
      return (offset > 0 ? ' ' : '') + group
    })
  }
}
