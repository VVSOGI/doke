import { DiscoveryService, NestFactory } from '@nestjs/core'
import { ApiDocsGenerator, ReceivedMetadata } from 'doke-nest'
import { AppModule } from '../app.module'

async function generateDocs() {
  const app: any = await NestFactory.create(AppModule)
  const info: ReceivedMetadata = {
    name: 'free-todolist',
    description: `A full-stack todo list application designed for practice, focusing on improving architectural skills and testing various design patterns (container-presenter, layered ...) in both frontend and backend development.`,
    version: '1.0.0',
    serverUrl: 'http://localhost:3000'
  }

  const discoveryService = app.get(DiscoveryService)
  await new ApiDocsGenerator(info, discoveryService).generate()
  await app.close()
}

generateDocs()
  .then(() => {
    console.log('API documentation generated successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to generate API documentation:', error)
    process.exit(1)
  })
