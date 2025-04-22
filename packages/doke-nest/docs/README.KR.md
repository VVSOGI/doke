# doke-nest

NestJS 애플리케이션을 위한 간단하고 아름다운 API 문서 생성기입니다.

## 개요

doke-nest는 NestJS 애플리케이션을 위해 특별히 설계된 강력한 문서 생성기입니다. TypeScript 데코레이터와 리플렉션을 사용하여 컨트롤러에서 API 메타데이터를 자동으로 추출하고 JSON 형식의 포괄적인 문서를 생성합니다.

이 라이브러리는 개발 워크플로우를 방해하지 않으면서 API를 우아하게 문서화하는 방법을 제공하는 데 중점을 두며, 클라이언트나 다른 개발 팀과 공유할 때 더 전문적인 시각적으로 매력적인 문서를 제작합니다.

## 설치

```bash
# npm 사용
npm install doke-nest

# yarn 사용
yarn add doke-nest
```

## 작동 원리

doke-nest는 세 가지 핵심 기술을 활용합니다:

1. **TypeScript 데코레이터**: 커스텀 데코레이터(`@ApiDocsController`, `@ApiDocsEndpoint`)가 컨트롤러와 엔드포인트에 메타데이터를 부착합니다.

2. **리플렉션 API**: `Reflect.defineMetadata`와 `Reflect.getMetadata`를 통해 이 문서 정보를 저장하고 검색합니다.

3. **NestJS 디스커버리 서비스**: `DiscoveryService`를 사용하여 애플리케이션을 스캔하고 모든 컨트롤러와 엔드포인트를 자동으로 찾습니다.

처리 과정은 다음과 같습니다:

1. 컨트롤러와 엔드포인트에 메타데이터로 데코레이팅합니다
2. `ControllerExtractor`가 디스커버리 서비스를 사용하여 모든 컨트롤러를 찾습니다
3. `MetadataExtractor`가 리플렉션을 사용하여 메타데이터를 추출합니다
4. `ApiDocsGenerator`가 이 데이터를 구조화된 형식으로 처리합니다
5. 문서가 `api-docs` 폴더에 JSON 파일로 작성됩니다

## 요구사항

- NestJS v10.0.0 이상
- `@nestjs/core`의 `DiscoveryModule`

## 빠른 시작

### 1. DiscoveryModule 가져오기

먼저 루트 AppModule에 `DiscoveryModule`을 추가합니다:

```typescript
import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'

@Module({
  imports: [
    // 다른 모듈들...
    DiscoveryModule
  ]
})
export class AppModule {}
```

### 2. 문서 생성기 스크립트 만들기

문서를 생성하는 파일을 만듭니다(예: `generate-docs.ts`):

```typescript
import { DiscoveryService, NestFactory } from '@nestjs/core'
import { ApiDocsGenerator, ReceivedMetadata } from 'doke-nest'
import { AppModule } from './app.module'

async function generateDocs() {
  const app = await NestFactory.create(AppModule)

  const info: ReceivedMetadata = {
    name: '내 API',
    description: '내 애플리케이션을 위한 API 문서',
    version: '1.0.0',
    serverUrl: 'http://localhost:3000'
  }

  const discoveryService = app.get(DiscoveryService)
  await new ApiDocsGenerator(info, discoveryService).generate()
  await app.close()
}

generateDocs()
  .then(() => {
    console.log('API 문서가 성공적으로 생성되었습니다!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('API 문서 생성 실패:', error)
    process.exit(1)
  })
```

### 3. package.json에 문서화 스크립트 추가

```json
{
  "scripts": {
    "generate-docs": "ts-node src/generate-docs.ts"
  }
}
```

## 컨트롤러 문서화하기

### 컨트롤러 문서화

NestJS의 `@Controller`와 함께 `@ApiDocsController` 데코레이터를 사용합니다:

```typescript
import { Controller } from '@nestjs/common'
import { ApiDocsController } from 'doke-nest'

@ApiDocsController({
  description: '카테고리 관리 API 엔드포인트',
  tags: ['카테고리']
})
@Controller('category')
export class CategoryController {
  // 메서드...
}
```

### 엔드포인트 문서화

개별 엔드포인트의 경우, 더 나은 구성을 위해 커스텀 데코레이터를 만듭니다:

```typescript
// decorators/docs-create-category.decorator.ts
import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsCreateCategory = () => {
  const metadata: EndpointDecoratorMetadata<{
    body: 'title'
    headers: 'Content-Type' | 'Authorization'
    response: 'id' | 'title' | 'createdAt' | 'updatedAt' | 'deleted'
  }> = {
    description: `이 엔드포인트는 todolist 항목을 구성하기 위한 새 카테고리를 생성합니다.`,
    request: {
      body: {
        properties: {
          title: {
            type: 'string',
            description: '카테고리 제목',
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
        title: '테스트 제목',
        createdAt: '2025-02-10T13:00:27.440Z',
        updatedAt: '2025-02-10T13:00:27.440Z',
        deleted: false
      }
    }
  }

  return ApiDocsEndpoint(metadata)
}
```

그런 다음 이 데코레이터를 컨트롤러 메서드에 적용합니다:

```typescript
import { Controller, Post } from '@nestjs/common'
import { DocsCreateCategory } from './decorator'

@Controller('category')
export class CategoryController {
  @Post()
  @DocsCreateCategory()
  async createCategory(): Promise<object> {
    // 구현...
    return {}
  }
}
```

## 생성된 문서 구조

생성된 문서는 `api-docs` 폴더에 다음과 같은 구조의 JSON 파일로 저장됩니다:

```
api-docs/
├── project-metadata.json    # 전체 프로젝트 정보
└── controllers/
    ├── user-controller.json # 각 컨트롤러는 자체 파일을 가집니다
    ├── category-controller.json
    └── ...
```

### project-metadata.json

프로젝트 수준 정보를 포함합니다:

```json
{
  "name": "내 API",
  "description": "내 애플리케이션을 위한 API 문서",
  "version": "1.0.0",
  "serverUrl": "http://localhost:3000",
  "routes": ["/users", "/category"]
}
```

### 컨트롤러 JSON 파일

각 컨트롤러는 엔드포인트가 포함된 자체 JSON 파일을 가집니다:

```json
{
  "controllerName": "CategoryController",
  "basePath": "category",
  "description": "카테고리 관리 API 엔드포인트",
  "tags": ["카테고리"],
  "endpoints": [
    {
      "methodName": "createCategory",
      "path": "",
      "httpMethod": "POST",
      "description": "이 엔드포인트는 todolist 항목을 구성하기 위한 새 카테고리를 생성합니다.",
      "request": {
        "body": {
          "properties": {
            "title": {
              "type": "string",
              "description": "카테고리 제목",
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
          "title": "테스트 제목",
          "createdAt": "2025-02-10T13:00:27.440Z",
          "updatedAt": "2025-02-10T13:00:27.440Z",
          "deleted": false
        }
      }
    }
    // 다른 엔드포인트들...
  ]
}
```

## 고급 사용법

### 타입 안전 엔드포인트 문서화

`EndpointDecoratorMetadata` 제네릭 타입은 타입 안전성을 보장합니다:

```typescript
EndpointDecoratorMetadata<{
  body: 'title' | 'description' // 요청 본문의 속성
  query: 'page' | 'limit' // 쿼리 파라미터
  params: 'id' // URL 파라미터
  headers: 'Authorization' // 요청 헤더
  response: 'id' | 'title' // 응답의 속성
}>
```

### 커스텀 문서 경로

생성된 문서의 커스텀 경로를 지정할 수 있습니다:

```typescript
await new ApiDocsGenerator(info, discoveryService, 'custom/path/to/docs').generate()
```

### 구성 전략

대규모 API의 경우, 문서화 데코레이터를 기능별로 구성합니다:

```
src/
└── modules/
    └── users/
        └── decorators/
            ├── docs-create-user.decorator.ts
            ├── docs-update-user.decorator.ts
            └── ...
        └── users.controller.ts
    └── products/
        └── decorators/
            └── ...
```

## 문서 보기

생성된 JSON 파일은 [doke-ui](https://github.com/VVSOGI/doke/tree/main/packages/doke-ui) 패키지로 볼 수 있습니다. 문서 UI를 빠르게 설정하려면:

```bash
npx doke-cli generate-ui
```

이는 API 문서를 탐색하기 위한 아름답고 반응형 인터페이스를 제공합니다.

## 완전한 예제

문서화된 컨트롤러의 완전한 예제입니다:

```typescript
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { ApiDocsController } from 'doke-nest'
import { DocsCreateCategory, DocsGetCategory, DocsUpdateCategory, DocsGetCategoryById, DocsDeleteCategory } from './decorator'

@ApiDocsController({
  description: '카테고리 관리 API 엔드포인트',
  tags: ['카테고리']
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

더 많은 예제는 [TodoList 예제](https://github.com/VVSOGI/doke/tree/main/examples/todolist)를 확인하세요.

## 라이센스

MIT 라이센스 - 자세한 내용은 [LICENSE](../../../LICENSE) 파일을 참조하세요.
