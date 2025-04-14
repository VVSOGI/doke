# doke 예제 - NestJS TodoList 프로젝트

이 예제 프로젝트는 doke를 사용해서 api-docs와 doke-ui 서버를 간단하게 생성하는 방법을 보여줍니다.

## 빠른 설정 가이드

이 예제는 API 문서를 생성하기 위해 커스텀 데코레이터가 있는 NestJS를 사용합니다. 다음은 설정 방법입니다:

### 1. AppModule 설정

`app.module.ts`에는 doke가 컨트롤러를 검사하는 데 필요한 `DiscoveryModule`이 포함되어 있습니다:

```typescript
import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { CategoryModule, TodolistModule } from './services'

@Module({
  imports: [CategoryModule, TodolistModule, DiscoveryModule]
})
export class AppModule {}
```

### 2. 문서 생성기

문서 생성기는 `src/utils/generate-docs.ts`에 설정되어 있습니다:

```typescript
import { DiscoveryService, NestFactory } from '@nestjs/core'
import { ApiDocsGenerator, ReceivedMetadata } from 'doke-nest'
import { AppModule } from '../app.module'

async function generateDocs() {
  const app: any = await NestFactory.create(AppModule)
  const info: ReceivedMetadata = {
    name: 'free-todolist',
    description: `이것은 샘플 TodoList API입니다`,
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

### 3. 커스텀 엔드포인트 데코레이터

각 컨트롤러 엔드포인트는 기능을 설명하는 커스텀 데코레이터를 사용합니다. 예를 들어, `DocsCreateCategory` 데코레이터:

```typescript
import { ApiDocsEndpoint, EndpointDecoratorMetadata } from 'doke-nest'

export const DocsCreateCategory = () => {
  /**
     * 해당 컨트롤러에서 필요로하는 body, query, params, headers를 타입으로 명시해줍니다.
     * 이곳에서 명시하는 타입은 해당 request parameter의 properties에 해당합니다.
     * 이 properties는 아래와 같이 구성되어있습니다.
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
    description: `새 카테고리 생성`,
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

### 4. Package.json 스크립트

문서는 `package.json`에 정의된 스크립트를 사용하여 생성됩니다:

```json
"scripts": {
  "start:doke-build": "ts-node src/utils/generate-docs.ts"
}
```

## 예제 실행하기

1. 의존성 설치:

   ```bash
   yarn install
   # 또는
   npm install
   ```

2. API 문서 생성:

   ```bash
   yarn start:doke-build
   # 또는
   npm run start:doke-build
   ```

   이렇게 하면 프로젝트 루트에 `api-docs` 폴더가 생성됩니다.

3. NestJS 서버 시작:

   ```bash
   yarn start
   # 또는
   npm run start
   ```

4. `http://localhost:3000`에서 API 접근

## 프로젝트 구조

```
todolist/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── services/
│   │   ├── category/
│   │   │   ├── category.controller.ts
│   │   │   ├── category.service.ts
│   │   │   └── docs/
│   │   │       └── endpoints.ts
│   │   └── todolist/
│   │       ├── todolist.controller.ts
│   │       ├── todolist.service.ts
│   │       └── docs/
│   │           └── endpoints.ts
│   └── utils/
│       └── generate-docs.ts
├── api-docs/          # 생성된 문서
├── package.json
└── README.md          # 이 파일
```
