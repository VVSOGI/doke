import { DiscoveryService } from '@nestjs/core'
import { ControllerExtractor } from '../../generators'
import { ERROR_MESSAGES } from '../../constants'
import { TodoController } from '../__fixtures__/controllers'
import { getControllersMockData } from '../__fixtures__/mocks'
import { CommonUtils, MetadataExtractor } from '../../'

describe('Testing ControllerExtractor extract right data', () => {
  let controllerExtractor: ControllerExtractor
  let mockDiscoveryService: jest.Mocked<DiscoveryService>
  let controller: TodoController
  let mockWrapper: any

  beforeEach(() => {
    mockDiscoveryService = {
      getControllers: jest.fn()
    } as any

    controllerExtractor = new ControllerExtractor(mockDiscoveryService)
    controller = new TodoController()
    mockWrapper = {
      instance: controller,
      metatype: TodoController,
      name: 'TodoController',
      token: TodoController,
      async: false,
      host: undefined,
      isAlias: false,
      scope: undefined,
      dependencies: [],
      providers: [],
      initTime: 0,
      enhancerMetadata: undefined,
      isDependencyTreeStatic: () => true,
      getDependencyContext: () => ({}),
      getInstanceByContextId: () => controller,
      setInstanceByContextId: () => {},
      getStaticTransientInstances: () => [],
      cloneStaticInstance: () => controller,
      createPrototype: () => controller,
      isNotMetatype: () => false,
      isTransient: () => false,
      initialize: () => Promise.resolve(controller),
      setIsRequestScoped: () => {},
      setInstanceByInquirerId: () => {},
      getInstanceByInquirerId: () => controller,
      values: []
    } as any
  })

  it('should throw error when DiscoveryService is not provided', () => {
    expect(() => new ControllerExtractor(undefined as any)).toThrow(ERROR_MESSAGES.NO_DISCOVERY_SERVICE)
  })

  it('should extract controller information correctly', async () => {
    mockDiscoveryService.getControllers.mockReturnValue([mockWrapper])
    const result = await controllerExtractor.extract()
    const controllerName = MetadataExtractor.extractControllerPath(TodoController)

    expect(result).toHaveLength(1)
    expect(result[0].controllerName).toEqual(CommonUtils.camelToPascalCase(controllerName))
    expect(result[0].description).toEqual(getControllersMockData('todoController').description)
    expect(result[0].basePath).toEqual('todo')
  })
})
