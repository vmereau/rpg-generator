<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Experimental project using Gemini 2.0 and text to image AI to generate an rpg based on user input
using [Nest](https://github.com/nestjs/nest) framework

## Installation

```bash
$ npm install
```

and setup the .env file

## Usage

Before pushing to a branch:
```bash
npm run format && npm run lint
npm run test
```

### Commit format

The commit message must be written in english and follow the format: `{type}: {message}`.  
Types:
- feat: new feature/module/entity/controller/service/etc.
- fix: bug fix/patch
- refactor: changing an existing module/entity/feature/function...
- docs: any creation/modification/deletion of documentation
- ops: build/devops related stuff
- test: test related stuff
- style: code style related stuff without functional change

Example of correct commit messages:
```
feat: add documents module
fix: dashboard routes should be accessible only with a jwt
docs: add some comments about the module X
build: improve eslint checks
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
