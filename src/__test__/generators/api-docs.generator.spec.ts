import { DiscoveryService } from '@nestjs/core'
import { ApiDocsGenerator } from '../../generators'
import { ControllerExtractor, DocsWriter } from '../../generators'

jest.mock('../../utils/file-manager')
jest.mock('../../generators/controller-extractor')
jest.mock('../../generators/docs-writer')

describe('ApiDocsGenerator', () => {
  let apiDocsGenerator: ApiDocsGenerator
  let mockDiscoveryService: jest.Mocked<DiscoveryService>
  let mockControllerExtractor: jest.Mocked<ControllerExtractor>
  let mockDocsWriter: jest.Mocked<DocsWriter>

  const testMetadata = {
    name: 'test-api',
    description: 'Test API Description',
    version: '1.0.0'
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockDiscoveryService = {
      getControllers: jest.fn()
    } as any

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
  })
})
