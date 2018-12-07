// import * as chai from 'chai';
// const expect = chai.expect;
// import * as express from 'express';
// import {} from 'mocha';
// import { CONFIG } from '../src/config';

// import { AuthModule } from '../src/auth.module';
// import { AuthRepo } from '../src/auth.repository';
// import { promiseErrorFactory } from '@agenda.ch/backend-utils';
// import {
//   appMock,
//   authMiddlewareMock,
//   dbMock,
//   optionsMockWithServerConfig
// } from '../../../test/mocks';
// import { IAgModule } from '@agenda.ch/backend-utils';

// let result;
// const assignResult = (res) => { result = res; };
// const doNothing = _ => {};


// describe('[Server] Auth Module', () => {

//   it('Should require DB to start', async () => {
//     const options = { ...optionsMockWithServerConfig };
//     options.db = undefined;
//     await (new AuthModule(options) as IAgModule).init(<express.Application>appMock)
//     .then(assignResult)
//     .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthModule} The existing server must be started with connected database'));
//   });

//   it('Should require auth middleware to start', async () => {
//     const options = { ...optionsMockWithServerConfig };
//     options.middlewares = undefined;
//     await (new AuthModule(options) as IAgModule).init(<express.Application>appMock)
//     .then(assignResult)
//     .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthModule} The existing server must be started with authMiddleware instance'));
//   });

//   it('Should require server configuration to start', async () => {
//     const options = { ...optionsMockWithServerConfig };
//     options.serverConfig = undefined;
//     await (new AuthModule(options) as IAgModule).init(<express.Application>appMock)
//     .then(assignResult)
//     .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthModule} The existing server must be started with server config instance'));
//   });

//   it('Should store auth middleware', async () => {
//     const mod = new AuthModule(optionsMockWithServerConfig) as IAgModule;
//     await mod.init(<express.Application>appMock)
//     .then(doNothing)
//     .catch(doNothing);
//     expect(mod.middlewares).to.eql(authMiddlewareMock);

//   });

//   it('Should store express server', async () => {
//     const mod = new AuthModule(optionsMockWithServerConfig) as IAgModule;
//     await mod.init(<express.Application>appMock)
//     .then(doNothing)
//     .catch(doNothing);
//     expect(mod.app).to.eql(appMock);
//   });

//   it('Should store db', async () => {
//     const mod = new AuthModule(optionsMockWithServerConfig) as IAgModule;
//     await mod.init(<express.Application>appMock)
//     .then(doNothing)
//     .catch(doNothing);
//     expect(mod.db).to.eql(dbMock);
//   });

//   it('Should store db', async () => {
//     const mod = new AuthModule(optionsMockWithServerConfig) as IAgModule;
//     await mod.init(<express.Application>appMock)
//     .then(doNothing)
//     .catch(doNothing);
//     expect(mod.serverConfig).to.eql(optionsMockWithServerConfig.serverConfig);
//   });

//   it('Should create repo', async () => {
//     const mod = new AuthModule(optionsMockWithServerConfig) as IAgModule;
//     await mod.init(<express.Application>appMock)
//     .then(doNothing)
//     .catch(doNothing);
//     expect(mod.repo).to.be.an.instanceof(AuthRepo);
//   });

// });
