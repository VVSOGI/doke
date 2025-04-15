# doke-ui

doke 문서 생성기를 위한 아름답게 디자인된 API 문서 UI입니다.

## Issues

1. [Docker 내에서 Next.js를 빌드할 때 예기치 않은 메모리 사용량 증가](https://github.com/VVSOGI/doke-ui/issues/62)

## 개요

doke-ui는 doke API 문서화 시스템의 프론트엔드 컴포넌트입니다. Next.js로 구축되었으며, API 엔드포인트를 탐색하고 테스트하기 위한 현대적이고 반응형 인터페이스를 제공합니다. 이 UI는 Swagger UI와 같은 전통적인 API 문서화 도구보다 시각적으로 더 매력적이고 사용자 친화적이도록 설계되었습니다.

## 특징

- **현대적인 UI**: React와 Next.js로 구축된 깔끔하고 직관적인 인터페이스
- **인터랙티브 문서**: UI에서 직접 API 엔드포인트 테스트 가능
- **반응형 디자인**: 데스크톱과 모바일 기기에서 원활하게 작동
- **CORS 보호**: CORS 문제를 방지하기 위해 Next.js 서버를 통한 API 요청 프록시

## 설치

```bash
# npm 사용
npm install doke-ui

# yarn 사용
yarn add doke-ui
```

## 사용법

doke-ui는 독립형 애플리케이션으로 사용되도록 설계되었습니다. doke-nest에서 생성한 API 문서를 읽고 API를 탐색하고 테스트하기 위한 사용자 인터페이스를 제공합니다.

### 구성

API 프록시를 설정하기 위한 Next.js 구성 파일(next.config.js)을 생성합니다:

### UI 실행

```bash
# 개발 모드
yarn dev

# 프로덕션 빌드
yarn build
yarn start
```

기본적으로 UI는 포트 3001에서 실행됩니다. http://localhost:3001에서 접근할 수 있습니다.

## 작동 방식

doke-ui는 다음과 같이 작동합니다:

1. doke-nest에서 생성한 `api-docs` 디렉토리의 API 문서를 읽습니다
2. API 엔드포인트, 매개변수 및 응답을 탐색하기 위한 사용자 친화적인 인터페이스를 렌더링합니다
3. API 엔드포인트를 테스트할 때:
   - 요청은 먼저 Next.js 서버로 전송됩니다
   - Next.js 서버는 실제 API 서버로 요청을 전달합니다
   - 이 프록시 접근 방식은 브라우저에서 API로 직접 요청할 때 발생하는 CORS 오류를 방지합니다

### API 요청 흐름

```
클라이언트 브라우저 → doke-ui (Next.js) → API 서버 (NestJS)
```

이 흐름은 브라우저가 다른 출처에서 API 서버에 직접 접근하려고 할 때 발생하는, 교차 출처 리소스 공유(CORS) 오류를 방지합니다.

## 개발

```bash
# 의존성 설치
yarn install

# 개발 서버 시작
yarn dev
```

## 의존성

- Next.js 15.2.0
- React 19.0.0
- react-json-view 1.21.3
- 스타일링을 위한 TailwindCSS

## 라이센스

MIT 라이센스 - 자세한 내용은 [LICENSE](../../../LICENSE) 파일을 참조하세요.
