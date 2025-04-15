# doke-cli

doke API 문서 UI를 생성하고 관리하기 위한 커맨드라인 인터페이스 도구입니다.

## 개요

doke-cli는 doke API 문서 UI를 생성하고 관리하는 강력한 커맨드라인 도구입니다. 직관적인 명령어를 통해 문서 인터페이스를 로컬 환경 또는 Docker로 클론, 구성 및 배포하는 과정을 단순화합니다.

## 사용법

CLI를 실행하기 전에 현재 디렉토리에 `api-docs` 폴더(doke-nest로 생성된)가 있어야 합니다.

```bash
# npx 사용 (권장)
npx doke-cli generate-ui

# 전역 설치한 경우
doke-cli generate-ui
```

명령어를 실행하면 다음과 같이 환경을 선택하라는 메시지가 표시됩니다:

```
generate doke ui
? Which environment do you want to run your project? › - Use arrow-keys. Return to submit.
❯   Generate local environment
    Generate docker environment
```

### 로컬 환경

"Generate local environment"를 선택하면:

1. 프로젝트 루트에 `doke-ui` 폴더가 생성됩니다
2. Next.js standalone 빌드 파일이 생성됩니다
3. UI 서버가 자동으로 시작됩니다
4. 문서는 http://localhost:3001 에서 확인할 수 있습니다

나중에 서버를 다시 시작하려면:

```bash
doke-cli start
```

### Docker 환경

"Generate docker environment"를 선택하면:

1. Next.js standalone 버전을 기반으로 Docker 이미지가 빌드됩니다
2. 프로젝트에 `doke-ui` 폴더가 생성되지 않습니다
3. Docker 이미지를 실행하여 서버를 시작할 수 있습니다

## 사전 요구사항

- Node.js 14 이상
- doke-nest로 생성된 API 문서(`api-docs` 폴더)
- 시스템에 Git 설치
- Docker (Docker 배포를 위한 선택 사항)

## 설치

`npx doke-cli`를 사용하는 것이 권장되지만, 전역으로 설치할 수도 있습니다:

```bash
# npm 사용
npm install -g doke-cli

# yarn 사용
yarn global add doke-cli
```

## 명령어

### generate-ui

API 문서에서 doke UI를 생성합니다:

```bash
doke-cli generate-ui
```

### start

기존 doke UI를 시작합니다:

```bash
doke-cli start
```

이 명령어는 현재 디렉토리에 `doke-ui` 폴더가 있다고 가정하고 doke UI 서버를 시작합니다.

## 문제 해결

- `api-docs` 폴더가 없는 오류가 발생하면, 먼저 doke-nest를 사용하여 API 문서를 생성했는지 확인하세요.
- 권한 문제가 있는 경우, 관리자 권한으로 명령어를 실행해 보세요.

## 라이센스

MIT 라이센스 - 자세한 내용은 [LICENSE](../LICENSE) 파일을 참조하세요.
