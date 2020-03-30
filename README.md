<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## A word about authentication

This project uses authentication in form of `Bearer` tokens. This is the regulat workflow:

1. Create a new user with `POST /api/user`
2. Login with just created user with `POST /auth/login`
3. Use `"Bearer <token>"` from the response in other request as `authorization` header

## Authorization

This project uses authorizaztion, as well, by using guards. All users are role `USER` as default but the endpoint to create a new match (`POST /api/match`) requires an `ADMIN` user.

## Debugging
In order to debug start the debugger with
```bash
$ yarn start:debug // or npm run start:debug
```

You will see some output, similar to this (IPs and ports might be different):
```bash
$ yarn start:debug
yarn run v1.22.0
$ nodemon --config nodemon-debug.json
[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `node --inspect-brk -r ts-node/register src/main.ts`
Debugger listening on ws://127.0.0.1:9229/76bf2046-269d-44e5-9e9d-0be1132569d4
For help, see: https://nodejs.org/en/docs/inspector
```

Now to start the debugger in VSCode by openinig the debugger menu in the left menu bar, select `Debug NestJS` configuration hit the green arrow and select the process that references `main.ts` and uses the port printed by the prior command (it's `9229` in this case). It might happen that the debugger stops in a `helper.js` file. Just tell the debugger to continue and you will see in the console that the application starts like usual but witht debugger attached:

```bash
$ yarn start:debug
yarn run v1.22.0
$ nodemon --config nodemon-debug.json
[nodemon] 1.19.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): src/**/*
[nodemon] watching extensions: ts
[nodemon] starting `node --inspect-brk -r ts-node/register src/main.ts`
Debugger listening on ws://127.0.0.1:9229/cdbf5199-2ed3-4063-b367-6207277bccaa
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [NestFactory] Starting Nest application...
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] AppModule dependencies initialized +101ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] TypeOrmModule dependencies initialized +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] PassportModule dependencies initialized +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] TypeOrmCoreModule dependencies initialized +113ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] TypeOrmModule dependencies initialized +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] TypeOrmModule dependencies initialized +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] DatabaseModule dependencies initialized +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] TableModule dependencies initialized +15ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] UserModule dependencies initialized +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] MatchModule dependencies initialized +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [InstanceLoader] AuthModule dependencies initialized +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RoutesResolver] MatchController {/api}: +4ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/matches, GET} route +3ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/match/:matchId, GET} route +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/match, POST} route +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/match/:id, PUT} route +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/match/:id/finish, PATCH} route +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/match/:id/homegoal, PATCH} route +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/match/:id/guestgoal, PATCH} route +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/match/:id, DELETE} route +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/matches, DELETE} route +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RoutesResolver] TableController {/api}: +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/table, GET} route +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RoutesResolver] UserController {/api/user}: +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/, POST} route +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RoutesResolver] AuthController {/auth}: +1ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [RouterExplorer] Mapped {/login, POST} route +0ms
[Nest] 49697   - 03/30/2020, 9:07:41 AM   [NestApplication] Nest application successfully started +87ms
Listening on port 3000
```

Given any breakpoints are set, you are now able to tigger some HTTP calls and the VSCode debugger will stop at breakpoints.