# Doke Example - NestJS TodoList Project

This example project demonstrates how to use doke to simply create an api-docs and doke-ui server.

## Documentation

- [Korean Documentation (한국어 문서)](https://github.com/VVSOGI/doke/blob/main/examples/todolist/docs/README.KR.md)

## Quick Setup Guide

This example uses NestJS with custom decorators to generate API documentation. Here's how it's set up:

### 1. AppModule Configuration

The `app.module.ts` includes `DiscoveryModule` which is required for Doke to inspect controllers:

```typescript
import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { CategoryModule, TodolistModule } from './services'

@Module({
  imports: [CategoryModule, TodolistModule, DiscoveryModule]
})
export class AppModule {}
```

### 2. Documentation Generator

The generator is set up in `src/utils/generate-docs.ts`:

```typescript
import { DiscoveryService, NestFactory } from '@nestjs/core'
import { ApiDocsGenerator, ReceivedMetadata } from 'doke-nest'
import { AppModule } from '../app.module'

async function generateDocs() {
  const app: any = await NestFactory.create(AppModule)
  const info: ReceivedMetadata = {
    name: 'free-todolist',
    description: `This is a sample TodoList API`,
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

### 3. Custom Endpoint Decorators

Each controller endpoint uses a custom decorator that describes its functionality. For example, the `DocsCreateCategory` decorator:

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
    description: `Create a new category`,
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

### 4. Package.json Script

The documentation is generated using a script defined in `package.json`:

```json
"scripts": {
  "start:doke-build": "ts-node src/utils/generate-docs.ts"
}
```

## Running the Example

1. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

2. Generate API documentation:

   ```bash
   yarn start:doke-build
   # or
   npm run start:doke-build
   ```

   This will create an `api-docs` folder in the project root.

3. Start the NestJS server:

   ```bash
   yarn start
   # or
   npm run start
   ```

4. Access the API at `http://localhost:3000`

## Project Structure

```
todolist/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── services/
│   │   ├── category/
│   │   │   ├── category.controller.ts
│   │   │   ├── category.service.ts
│   │   │   └── decorator/
│   │   │       └── doke-docs
│   │   └── todolist/
│   │       ├── todolist.controller.ts
│   │       ├── todolist.service.ts
│   │       └── decorator/
│   │           └── doke-docs
│   └── utils/
│       └── generate-docs.ts
├── api-docs/          # Generated documentation
├── package.json
└── README.md          # This file
```

## Key Features Demonstrated

- Custom decorators for API documentation
- Automatic documentation generation
- Integration with NestJS controllers
- Documentation of request bodies, headers, and responses

For more information on how to use Doke in your own projects, please refer to the main project documentation.
