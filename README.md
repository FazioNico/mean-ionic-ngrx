<img src="https://live.zoomdata.com/zoomdata/service/connection/types/icon/MONGO_MONGO?v=$%7Btimestamp%7D" width="80"><img src="http://apps.octoconsulting.com/images/expressIcon.png" width="80"><img src="https://material.angularjs.org/latest/img/icons/angular-logo.svg" width="80"><img src="http://code.runnable.com/images/provider-icons/icon-node.js.svg" width="80"><img src="http://amver.lt/wp-content/uploads/2016/07/Mathematic-Plus2.ico" style="margin:0px 15px" height="80px"><img src="http://cloudoki.com/images/frameworks/ionic.png" width="80"><img src="https://avatars2.githubusercontent.com/u/16272733?v=3&s=200" height="80px">

#  MEAN Ionic NgRx
<blockquote>Full MEAN stack with Ionic Framework and ReactiveX API (ngrx/Store + ngrx/Effects)</blockquote>

## Overview
MEAN Ionic NgRx is a TypeScript Full Stack MongoDB + ExpressJS + Angular2 + NodeJS with Ionic 2 Framework to provide multi platform application.

It's a simple todo application exemple with server-side Users JWT authentification & using ReactiveX API (ngrx/Store + ngrx/Effects)

Hop is help you to start your project on the right way.

## Prerequisites
- NVM - [Download](https://github.com/creationix/nvm) & Install Node Version Manage
- NodeJS 7 - Download & Install Node.js and the npm package manager with NVM `$ nvm install node 7`.
- MongoDB - [Download](https://www.mongodb.com) & Install MongoDB, and make sure it's running on the default port (27017).
- [Typescript](https://www.npmjs.com/package/typescript) Latest stable version install in Global `$ npm install -g typescript`
- [Nodemon](https://nodemon.io/) Latest stable version install in Global `$ npm install -g nodemon`
- [Ionic 3](https://ionicframework.com/) & [Cordova](https://cordova.apache.org/) - Latest stable version install in Global `$ npm install -g ionic cordova`
- Good knowledge of [ReactiveX API](http://reactivex.io/) & [NgRx](https://github.com/ngrx)
- And you should also have git installed to a better working flow.

## Get Started
### Installation
- `$ nvm use 7`
- `$ npm install`

### Start
- `$ npm run start:dev` to start in dev mode
- `$ npm run start:prod` to start in prod mode

### Build
- `$ npm run build:browser` to build app browser version
- `$ npm run build:browser --prod` to build app browser version in Angular Prod mode
- `$ npm run build:ios` to build app IOS version
- `$ npm run build:ios --prod` to build app IOS version in Angular Prod mode

### Deploy
- `$ npm run deploy:server` to deploy server side on heroku
- `$ npm run deploy:client` to deploy client side on GitHub gh-pages


## Server REST API Endpoints
````
TODOS Endpoints

  path: http://localhost:8080/todos
  autenticate: false
  methode: $_GET / $_POST

  path: http://localhost:8080/todos/:id
  autenticate: false
  methode: $_GET / $_POST / $_DELETE


AUTH Endpoints

  path: http://localhost:8080/auth
  autenticate: false
  methode: $_POST

  path: http://localhost:8080/isauth
  autenticate: false/true
  methode: $_GET

  path: http://localhost:8080/signup
  autenticate: false
  methode: $_POST


USERS Endpoints

  path: http://localhost:8080/users
  autenticate: true
  methode: $_GET


  path: http://localhost:8080/users/:id
  autenticate: true
  methode: $_GET

````

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
