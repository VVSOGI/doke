import { DiscoveryService } from '@nestjs/core'
import { ControllerExtractor } from '../../generators'
import { ERROR_MESSAGES } from '../../constants'

describe('ControllerExtractor', () => {
  let controllerExtractor: ControllerExtractor
  let mockDiscoveryService: jest.Mocked<DiscoveryService>

  beforeEach(() => {
    mockDiscoveryService = {
      getControllers: jest.fn()
    } as any

    controllerExtractor = new ControllerExtractor(mockDiscoveryService)
  })

  it('should throw error when DiscoveryService is not provided', () => {
    expect(() => new ControllerExtractor(undefined as any)).toThrow(ERROR_MESSAGES.NO_DISCOVERY_SERVICE)
  })

  it('should extract controller information correctly', async () => {
    const mockWrapper = {
      hello: 'world'
    } as any

    mockDiscoveryService.getControllers.mockReturnValue([mockWrapper])
    const result = await controllerExtractor.extract()

    expect(result).toHaveLength(1)
  })
})
