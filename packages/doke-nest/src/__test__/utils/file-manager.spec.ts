import * as fs from 'fs'
import * as path from 'path'
import { FileManager } from '../../utils'

describe('Testing FileManger is behaving as predicted', () => {
  const testPath = path.join(process.cwd(), '/src/__test__/utils')
  const fileManager = new FileManager(testPath)

  it('should create api-docs folder at testPath when used createDirectory', async () => {
    await fileManager.createDirectory()
    expect(fs.existsSync(testPath + '/api-docs')).toBeTruthy()
    await fileManager.cleanDirectory()
    expect(fs.existsSync(testPath + '/api-docs')).toBeFalsy()
  })

  it('should convert user-supplied data to a JSON file', async () => {
    const test = { message: 'hello world!' }
    await fileManager.createDirectory()
    expect(fs.existsSync(testPath + '/api-docs')).toBeTruthy()
    await fileManager.saveJson('testing', test)
    expect(fs.existsSync(testPath + '/api-docs/testing.json')).toBeTruthy()
    await fileManager.cleanDirectory()
    expect(fs.existsSync(testPath + '/api-docs')).toBeFalsy()
  })
})
