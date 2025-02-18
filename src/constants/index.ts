export const DEFAULT_CONFIG = {
  VERSION: '1.0.0',
  TITLE: 'API Documentation',
  DESCRIPTION: 'Generated API documentation by doke',
  ENCODINGS: 'utf-8',
  OUTPUT_PATH: 'api-docs',
  JSON_INDENT: 2
} as const

export * from './metadata.keys'
export * from './errors'
