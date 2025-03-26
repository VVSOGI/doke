export interface ReceivedMetadata {
  name: string
  description: string
  version: string
  serverUrl: string
}

export interface ProjectMetadata extends ReceivedMetadata {
  routes: string[]
}
