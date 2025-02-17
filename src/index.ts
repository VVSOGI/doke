import 'reflect-metadata'

export interface TestInterface {
  name: string
  value: number
}

export class TestClass {
  constructor(private readonly data: TestInterface) {}

  getData(): TestInterface {
    return this.data
  }
}
