export const ERROR_MESSAGES = {
  INVALID_APP: 'Invalid NestJS application instance provided',
  NO_DISCOVERY_SERVICE: 'DiscoveryService not found in application instance',

  DIRECTORY_CREATE_FAILED: 'Failed to create directory',
  FILE_WRITE_FAILED: 'Failed to write file',
  INVALID_PATH: 'Invalid file path provided',

  NO_CONTROLLER_METADATA: 'No controller metadata found',
  NO_ENDPOINT_METADATA: 'No endpoint metadata found',
  INVALID_METHOD: 'Invalid HTTP method',

  INVALID_CONFIG: 'Invalid configuration provided',
  MISSING_REQUIRED_CONFIG: 'Missing required configuration options'
} as const

export type ErrorMessage = keyof typeof ERROR_MESSAGES
