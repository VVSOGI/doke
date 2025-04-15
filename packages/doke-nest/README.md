# doke-nest

Simple and beautiful API documentation generator for NestJS applications.

## Overview

doke-nest is a powerful documentation generator designed specifically for NestJS applications. It uses TypeScript decorators and reflection to automatically extract API metadata from your controllers and generate comprehensive documentation in JSON format.

This library focuses on providing a simple way to document your APIs without disrupting your development workflow, while creating more professional and aesthetically pleasing documentation to share with clients or other development teams.

## Installation

```bash
# Using npm
npm install doke-nest

# Using yarn
yarn add doke-nest
```

## How It Works

doke-nest works by leveraging three key technologies:

1. **TypeScript Decorators**: Custom decorators (`@ApiDocsController`, `@ApiDocsEndpoint`) attach metadata to your controllers and endpoints.

2. **Reflection API**: Through `Reflect.defineMetadata` and `Reflect.getMetadata`, we store and retrieve this documentation information.

3. **NestJS Discovery Service**: The `DiscoveryService` allows us to scan your application and find all controllers and their endpoints automatically.

The process flow is:

1. You decorate your controllers and endpoints with metadata
2. The `ControllerExtractor` finds all controllers using the Discovery Service
3. The `MetadataExtractor` pulls out the metadata using reflection
4. The `ApiDocsGenerator` processes this data into a structured format
5. The documentation is written as JSON files to the `api-docs` folder

## Requirements

- NestJS v10.0.0 or higher
- `DiscoveryModule` from `@nestjs/core`

## Quick Start

### 1. Import DiscoveryModule

First, add the `DiscoveryModule` to your root AppModule:

```typescript
import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'

@Module({
  imports: [
    // Your other modules...
    DiscoveryModule
  ]
})
export class AppModule {}
```

### 2. Create a Documentation Generator Script

Create a file to generate your documentation (e.g., `generate-docs.ts`):

```typescript
import { DiscoveryService, NestFactory } from '@nestjs/core'
import { ApiDocsGenerator, ReceivedMetadata } from 'doke-nest'
import { AppModule } from './app.module'

async function generateDocs() {
  const app = await NestFactory.create(AppModule)

  const info: ReceivedMetadata = {
    name: 'My API',
    description: 'API documentation for my application',
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

### 3. Add a Documentation Script to package.json

```json
{
  "scripts": {
    "generate-docs": "ts-node src/generate-docs.ts"
  }
}
```

## Documenting Your Controllers

### Controller Documentation

Use the `@ApiDocsController` decorator alongside NestJS's `@Controller`:

```typescript
import { Controller } from '@nestjs/common'
import { ApiDocsController } from 'doke-nest'

@ApiDocsController({
  description: 'Category management API endpoints',
  tags: ['Category']
})
@Controller('category')
export class CategoryController {
  // Methods...
}
```

### Endpoint Documentation

For individual endpoints, create custom decorators for better organization:

```typescript
// decorators/docs-create-category.decorator.ts
import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsCreateCategory = () => {
  const metadata: EndpointDecoratorMetadata<{
    body: 'title'
    headers: 'Content-Type' | 'Authorization'
    response: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'deleted'
  }> = {
    description: `This endpoint creates a new category for organizing todolist items.`,
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

Then apply this decorator to your controller method:

```typescript
import { Controller, Post } from '@nestjs/common'
import { DocsCreateCategory } from './decorator'

@Controller('category')
export class CategoryController {
  @Post()
  @DocsCreateCategory()
  async createCategory(): Promise<object> {
    // Implementation...
    return {}
  }
}
```

## Generated Documentation Structure

The generated documentation is stored in the `api-docs` folder as JSON files with this structure:

```
api-docs/
├── project-metadata.json    # Overall project information
└── controllers/
    ├── user-controller.json # Each controller gets its own file
    ├── category-controller.json
    └── ...
```

### project-metadata.json

Contains project-level information:

```json
{
  "name": "My API",
  "description": "API documentation for my application",
  "version": "1.0.0",
  "serverUrl": "http://localhost:3000",
  "routes": ["/users", "/category"]
}
```

### Controller JSON Files

Each controller gets its own JSON file with its endpoints:

```json
{
  "controllerName": "CategoryController",
  "basePath": "category",
  "description": "Category management API endpoints",
  "tags": ["Category"],
  "endpoints": [
    {
      "methodName": "createCategory",
      "path": "",
      "httpMethod": "POST",
      "description": "This endpoint creates a new category for organizing todolist items.",
      "request": {
        "body": {
          "properties": {
            "title": {
              "type": "string",
              "description": "Title of Category",
              "required": true
            }
          }
        },
        "headers": {
          "properties": {
            "Content-Type": {
              "default": "application/json"
            },
            "Authorization": {
              "default": "",
              "credentials": {
                "type": "Bearer"
              }
            }
          }
        }
      },
      "response": {
        "example": {
          "id": "98874008-8915-4d53-9239-3913f7ee2089",
          "title": "Test title",
          "createdAt": "2025-02-10T13:00:27.440Z",
          "updatedAt": "2025-02-10T13:00:27.440Z",
          "deleted": false
        }
      }
    }
    // Other endpoints...
  ]
}
```

## Advanced Usage

### Type-Safe Endpoint Documentation

The `EndpointDecoratorMetadata` generic type ensures type safety:

```typescript
EndpointDecoratorMetadata<{
  body: 'title' | 'description' // Properties in request body
  query: 'page' | 'limit' // Query parameters
  params: 'id' // URL parameters
  headers: 'Authorization' // Request headers
  response: 'id' | 'title' // Properties in response
}>
```

### Custom Documentation Path

You can specify a custom path for the generated documentation:

```typescript
await new ApiDocsGenerator(info, discoveryService, 'custom/path/to/docs').generate()
```

## Viewing the Documentation

The generated JSON files can be viewed with the [doke-ui](https://github.com/VVSOGI/doke/tree/main/packages/doke-ui) package. To quickly set up a UI for your documentation:

```bash
npx doke-cli generate-ui
```

This will provide a beautiful, responsive interface for exploring your API documentation.

## Complete Example

Here's a complete example of a documented controller:

```typescript
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiDocsController } from 'doke-nest'
import { DocsCreateCategory, DocsGetCategory, DocsUpdateCategory, DocsGetCategoryById, DocsDeleteCategory } from './decorator'

@ApiDocsController({
  description: 'Category management API endpoints',
  tags: ['Category']
})
@Controller('category')
export class CategoryController {
  @Post()
  @DocsCreateCategory()
  async createCategory(): Promise<object> {
    return {}
  }

  @Get()
  @DocsGetCategory()
  async getCategories(): Promise<object> {
    return {}
  }

  @Get(':categoryId')
  @DocsGetCategoryById()
  async getCategoryById(): Promise<object> {
    return {}
  }

  @Patch(':categoryId')
  @DocsUpdateCategory()
  async updateCategory(): Promise<object> {
    return {}
  }

  @Delete('/soft/:categoryId')
  @DocsDeleteCategory()
  async softDeleteCategoryById(): Promise<object> {
    return {}
  }
}
```

For more examples, check out the [TodoList example](https://github.com/VVSOGI/doke/tree/main/examples/todolist).

## License

MIT License - See the [LICENSE](../../LICENSE) file for details.
