export const METADATA_KEYS = {
  PATH: 'path',
  METHOD: 'method',

  CONTROLLER: 'api:controller',
  ENDPOINT: 'api:endpoint',

  BODY: 'api:body',
  QUERY: 'api:query',
  PARAM: 'api:param',
  HEADERS: 'api:headers'
} as const

export type MetadataKey = keyof typeof METADATA_KEYS
