Hello, this is a simple tutorial to learn how to use doke. The current example project is written in Nest js, with scripts written in package.json.

### How to use

To use doke-ui, you need to create a folder called api-docs in your current root. This folder is supposed to be created automatically at yarn start:doke-build if your doke setup is perfect.

We need to configure our environment to be the same as the example project.

The first setting is [app.module.ts](https://github.com/VVSOGI/doke/blob/main/examples/todolist/src/app.module.ts) with a DiscoveryModule in the imports section.

```typescript
import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { CategoryModule, TodolistModule } from './services'

@Module({
  imports: [CategoryModule, TodolistModule, DiscoveryModule]
})
export class AppModule {}
```

DiscoveryModule is the module we need to get information from the controller.

The second is src/utils/generate-docs. The location of this folder can be changed to suit your architecture style. I recommend adding it to utils by default:

const info: ReceivedMetadata = {} contains serverUrl, where you can put the address of your nest js server. This value allows the client to send API requests to the server.

Configure it like this and you're ready for the second one.

```typescript
import { DiscoveryService, NestFactory } from '@nestjs/core'
import { ApiDocsGenerator, ReceivedMetadata } from 'doke-nest'
import { AppModule } from '../app.module'

async function generateDocs() {
  const app: any = await NestFactory.create(AppModule)
  const info: ReceivedMetadata = {
    name: 'free-todolist',
    description: `...`,
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
```

As a third setup, we need to attach DOKE's custom decorator to each controller.

[Category Controller](https://github.com/VVSOGI/doke/blob/main/examples/todolist/src/services/category/category.controller.ts)

Each category controller has a custom decorator that describes that controller, such as DocsCreateCategory, DocsGetCategory... and so on, there will be a custom decorator describing that controller.

```typescript
import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsCreateCategory = () => {
  /**
    * Specify the types of body, query, params, and headers required by that controller.
    * The types we specify here correspond to the properties of the request parameter.
    * These properties are organized as follows
    * key: {
        type: 'string',
        description: 'Title of Category',
        required: true
      }
  */
  const metadata: EndpointDecoratorMetadata<{
    body: 'title'
    headers: 'Content-Type' | 'Authorization'
    response: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'deleted'
  }> = {
    description: `...`,
    request: {
      body: {
        properties: {
          title: {
            type: 'string',
            description: 'Title of Category',
            required: true
          }
        }
      },
      headers: {
        properties: {
          'Content-Type': {
            default: 'application/json'
          },
          Authorization: {
            default: '',
            credentials: {
              type: 'Bearer'
            }
          }
        }
      }
    },
    response: {
      example: {
        id: '98874008-8915-4d53-9239-3913f7ee2089',
        title: 'Test title',
        createdAt: '2025-02-10T13:00:27.440Z',
        updatedAt: '2025-02-10T13:00:27.440Z',
        deleted: false
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
```

After these three settings, you should be ready to use doke-nest.
Now type yarn start:doke-build (see package.json) in the terminal and it will automatically start installing via cli-command.
