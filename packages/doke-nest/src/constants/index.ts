export const DEFAULT_CONFIG = {
  VERSION: '1.0.0',
  TITLE: 'API Documentation',
  DESCRIPTION: 'Generated API documentation by doke',
  OUTPUT_PATH: 'api-docs',
  JSON_INDENT: 2,
  ROUTES: 'routes',
  EXTENSION: '.json'
} as const

export * from './metadata.keys'
export * from './errors'
