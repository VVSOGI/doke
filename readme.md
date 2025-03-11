# Doke

<img width="1552" alt="스크린샷 2025-03-12 오전 1 30 29" src="https://github.com/user-attachments/assets/8a95c6aa-4de5-4ed9-ad6b-8b4bb3fd2000" />
(preview)
<br /><br />

API documentation generator for NestJS applications with beautiful UI 🎨

## Features

- Simple API endpoint decorators
- Beautiful and customizable documentation UI
- Easy to use and integrate
- Automatic metadata extraction
- Customizable themes and layouts

## Packages

This repository is a monorepo containing the following packages:

- `@doke/core` - Core package for generating API documentation
- `@doke/ui` - UI package for rendering beautiful documentation

## Installation

```bash
# Install core package
npm install @doke/core

# Install UI package (optional) (Not support yet)
npm install @doke/ui
```

## Quick Start

### 1. Prepare docs data and package.json

```typescript
// package.json
  "scripts": {
    ...
    "generate-docs": "ts-node -r tsconfig-paths/register ./src/utils/generate-docs.ts", // <- Add this line
  }
```

```typescript
// /docs/create-user.docs.ts
import { ApiDocsEndpoint } from '@doke/core'

export const DocsCreateUser = () => {
  const metadata: EndpointDecoratorMetadata<{
    body: 'email' | 'name'
    response: 'id' | 'email' | 'name'
  }> = {
    description: 'Create a new user',
    request: {
      body: {
        properties: {
          email: {
            type: 'string',
            description: 'User email address',
            required: true
          },
          name: {
            type: 'string',
            description: 'User full name',
            required: false
          }
        },
      }
    },
    response: {
      example: {
        id: "98874008-8915-4d53-9239-3913f7ee2089",
        email: "test@test.com",
        name: "benny"
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
```

### 2. Add Decorators to Your Controllers

```typescript
import { Controller, Post, Body } from '@nestjs/common'
import { ApiDocsController } from '@doke/core'
import { DocsCreateUser } from '/docs'

@Controller('users')
@ApiDocsController({
  description: 'User management endpoints',
  tags: ['users']
})
export class UserController {
  constructor(...somethin) {}

  @Post()
  @DocsCreateUser() // use decorator make in /docs
  async createUser(@Body() createUserDto: CreateUserDto) {}
}
```

### 3. Generate Documentation

```typescript
// docs.ts
import { ApiDocsGenerator } from '@doke/core'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function generateDocs() {
  const app = await NestFactory.create(AppModule)

  const generator = new ApiDocsGenerator(
    {
      name: 'My API',
      description: 'API documentation for my awesome project',
      version: '1.0.0'
    },
    './docs'
  )

  const discoveryService = app.get(DiscoveryService)
  await new ApiDocsGenerator(info, './', discoveryService).generate()
  await app.close()
}

generateDocs()
```

### 4. Run command

```bash
npm run generate-docs
or
yarn generate-docs
```

### 5. View Documentation (with @doke/ui) (Not support yet)

```bash
# Install doke UI globally
npm install -g @doke/ui

# Start documentation server
doke serve ./docs
```

## Examples (Not support yet)

You can find more examples in our [examples directory](./examples).

## Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details.

## Support

- 📝 [Documentation](https://doke.dev)
- 💬 [GitHub Discussions](https://github.com/yourusername/doke/discussions)
- 🐛 [Bug Reports](https://github.com/yourusername/doke/issues)
