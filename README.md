<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center"><a href="http://nodejs.org" target="_blank">Nestjs</a> Batch Back-up Module</p>
    <p align="center">

## Description

일정 주기로 데이터베이스에서 데이터를 백업하기 위한 모듈입니다. 도커 환경에서 작동합니다. 도커 데몬을 포함하여, mysql 또는 postgresql 등의 데이터베이스가 이미 컨테이너화 되어 동작하고 있어야 합니다.

## Installation

루트 폴더에서 의존성을 설치합니다.

```bash
yarn 
```

## Environment Variables

앱 실행 전 환경 변수를 설정합니다. .env.example 파일을 참고하여 .env 파일을 생성합니다.

```bash
# .env.example
NODE_ENV='local' # 앱 실행 환경
SERVER_PORT=3001 # 앱이 실행될 포트
DATABASE_HOST='my-db' # 데이터베이스 호스트
DATABASE_PORT=3306 # 데이터베이스 포트
DATABASE_USER='root' # 데이터베이스 유저
DATABASE_PASSWORD='root' # 데이터베이스 비밀번호
DATABASE_SCHEMA='test-db' # 데이터베이스 스키마
DATABASE_SYNCHRONIZE=true # 데이터베이스 동기화
REMOVE_OLD_BACKUP_FILES_DAYS=7 # 백업 파일 보관 기간
```

## Running the app

yarn start를 통해 앱을 실행합니다.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run with pm2
