<img src="https://live.zoomdata.com/zoomdata/service/connection/types/icon/MONGO_MONGO?v=$%7Btimestamp%7D" width="80"><img src="http://apps.octoconsulting.com/images/expressIcon.png" width="80"><img src="https://material.angularjs.org/latest/img/icons/angular-logo.svg" width="80"><img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" width="80"><img src="https://camo.githubusercontent.com/a083a6650043b70297ab9655569d56ed0d300687/687474703a2f2f616d7665722e6c742f77702d636f6e74656e742f75706c6f6164732f323031362f30372f4d617468656d617469632d506c7573322e69636f" style="margin:0px 15px" height="80px"><img src="http://cloudoki.com/images/frameworks/ionic.png" width="80"><img src="https://avatars2.githubusercontent.com/u/16272733?v=3&s=200" height="80px">

#  MEAN Ionic NgRx Lazy Load
[![Build Status](https://travis-ci.org/FazioNico/mean-ionic-ngrx.svg?branch=master)](https://travis-ci.org/FazioNico/mean-ionic-ngrx) [![dependencies Status](https://david-dm.org/FazioNico/mean-ionic-ngrx/status.svg)](https://david-dm.org/FazioNico/mean-ionic-ngrx) [![devDependencies Status](https://david-dm.org/FazioNico/mean-ionic-ngrx/dev-status.svg)](https://david-dm.org/FazioNico/mean-ionic-ngrx?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/fazionico/mean-ionic-ngrx/badge.svg)](https://snyk.io/test/github/fazionico/mean-ionic-ngrx)
<blockquote>My own Full MEAN stack Starter kit with Ionic Framework and ReactiveX API (ngrx/Store + ngrx/Effects)</blockquote>

## Overview
MEAN Ionic NgRx is my own TypeScript Full Stack MongoDB + ExpressJS + Angular + NodeJS with Ionic  Framework to provide multi platform application.

It's a simple todo application exemple with server-side Users JWT authentification & using ReactiveX API (ngrx/Store + ngrx/Effects)

Hop is help you to start your project on the right way.

#### <i><b>work in proccess... do not use right now!!</b></i>

## Prerequisites
- NVM - [Download](https://github.com/creationix/nvm) & Install Node Version Manage
- NodeJS 7 - Download & Install Node.js and the npm package manager with NVM `$ nvm install node 7`.
- MongoDB - [Download](https://www.mongodb.com) & Install MongoDB, and make sure it's running on the default port (27017).
- [Typescript](https://www.npmjs.com/package/typescript) Latest stable version install in Global `$ npm install -g typescript`
- [Nodemon](https://nodemon.io/) Latest stable version install in Global `$ npm install -g nodemon`
- [Ionic 3](https://ionicframework.com/) & [Cordova](https://cordova.apache.org/) - Latest stable version install in Global `$ npm install -g ionic cordova`
- [TypeDoc](http://typedoc.org/) - Latest stable version install in Global `$ npm install -g typedoc`
- [Karma](https://karma-runner.github.io) - Latest stable version install in Global `$ npm install -g karma-cli`
- [Gulp](http://gulpjs.com/) - Latest stable version install in Global `$ npm install -g gulp`
- [Heroku](heroku.com) - Download & Install latest stable version.
- Good knowledge of [ReactiveX API](http://reactivex.io/) & [NgRx](https://github.com/ngrx)
- [Redux DevTools Extension](http://extension.remotedev.io/) - Install Plugin for Chrome - Debugging application's state changes & provides power-ups for your Redux development workflow.
- And you should also have git installed to a better working flow.

## Get Started
You have to check the [Todo before Get Started](#todo-before-get-started)

### Installation
- `$ nvm use 7`
- `$ npm install`

### Start
- `$ npm run start:dev` to start in dev mode
- `$ npm run start:prod` to start in prod mode (you have to config your production environments variable)

### Build
First add selected platform: `$ ionic platform add browser|ios|android` (one by one). Then you can build each platform with ionic CLI `$ ionic build browser|ios|android --prod`

And we have the following npm run script ready to use:
- `$ npm run build:browser` to build app browser version
- `$ npm run build:browser --prod` to build app browser version in Angular Prod mode

If you want, you can add your own build run script.

### Deploy
- `$ npm run deploy:server` to deploy server side on heroku
- `$ npm run deploy:client` to deploy client side on GitHub gh-pages

### Documentations
- `$ npm run docs`

open `./docs/index.html` to read documentation

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

## Documentation
App Documentations is generate by typeDoc. Use the following cmd to generate documentation
- `$ npm run docs` will generate Angular Application documentation and open the index doc in browser.

## Todo before get Started
- you have to change `mongod` npm script into `./package.json`. Update mongod $path with your own.
- create your own Heroku account and init your server project with the following cmd :
  - `git checkout master`
  - `$ heroku create`
  - check with `$ git remote -v`
  - optional: `$ git checkout <WORKING_BRANCH>`
- add your own production variable environment into `./environments/production.ts`

Heroku docs:
- get started doc for NodeJS
[https://devcenter.heroku.com/articles/git](https://devcenter.heroku.com/articles/git)
- how to use Heroku with NodeJS & Git [https://devcenter.heroku.com/articles/getting-started-with-nodejs](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

## About author
Hi, i'm a Front-end developper living in Geneva Switzerland and i build hybrid mobile & web applications for almost 15 years. You can follow me on Twitter @FazioNico or checkout my own website http://nicolasfazio.ch
