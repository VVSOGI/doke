import { DiscoveryService } from '@nestjs/core'
import { ApiDocsGenerator } from '../../generators'
import { ControllerExtractor, DocsWriter } from '../../generators'
import { ReceivedMetadata } from '../../interfaces'

jest.mock('../../utils/file-manager')
jest.mock('../../generators/controller-extractor')
jest.mock('../../generators/docs-writer')

describe('Testing that ApiDocsGenerator creates json files with the correct data', () => {
  let apiDocsGenerator: ApiDocsGenerator
  let mockDiscoveryService: jest.Mocked<DiscoveryService>
  let mockControllerExtractor: jest.Mocked<ControllerExtractor>
  let mockDocsWriter: jest.Mocked<DocsWriter>

  const testMetadata: ReceivedMetadata = {
    name: 'test-api',
    description: 'Test API Description',
    version: '1.0.0',
    serverUrl: 'http://localhost:3000'
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockDiscoveryService = {
      getControllers: jest.fn()
    } as any

    mockControllerExtractor = {
      extract: jest.fn()
    } as any

    mockDocsWriter = {
      writeDocumentation: jest.fn()
    } as any

    const mockControllers = [
      {
        controllerName: 'TodoController',
        basePath: 'todo',
        description: 'Todo items management',
        tags: ['todos'],
        endpoints: []
      }
    ]

    mockControllerExtractor.extract.mockResolvedValue(mockControllers)
    mockDocsWriter.writeDocumentation.mockResolvedValue(undefined)

    jest.spyOn(ControllerExtractor.prototype, 'extract').mockImplementation(mockControllerExtractor.extract)
    jest.spyOn(DocsWriter.prototype, 'writeDocumentation').mockImplementation(mockDocsWriter.writeDocumentation)

    apiDocsGenerator = new ApiDocsGenerator(testMetadata, 'test-output-path', mockDiscoveryService)
  })

  it('should generate documentation successfully', async () => {
    await apiDocsGenerator.generate()

    expect(mockControllerExtractor.extract).toHaveBeenCalled()
    expect(mockDocsWriter.writeDocumentation).toHaveBeenCalledWith({
      projectMetadata: {
        ...testMetadata,
        routes: ['todo']
      },
      controllers: expect.arrayContaining([
        expect.objectContaining({
          controllerName: 'TodoController',
          basePath: 'todo'
        })
      ])
    })
  })

  it('should handle empty controller list', async () => {
    mockControllerExtractor.extract.mockResolvedValue([])
    await apiDocsGenerator.generate()

    expect(mockDocsWriter.writeDocumentation).toHaveBeenCalledWith({
      projectMetadata: {
        ...testMetadata,
        routes: []
      },
      controllers: []
    })
  })
})
