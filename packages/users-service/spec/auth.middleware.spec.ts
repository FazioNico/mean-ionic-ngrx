// import {} from 'mocha';
// import * as chai from 'chai';
// const expect = chai.expect;
// import {CONFIG} from '../src/config';
// import { promiseErrorFactory, toObjectId, authenticationMiddleware } from '@agenda.ch/backend-utils';
// import {
//   requestMock,
//   responseMock,
//   VALID_JWT,
//   INVALID_JWT,
//   EXPIRED_JWT,
//   JWT_OBJECT,
//   optionsMockWithServerConfig,
// } from '../../../test/mocks';

// let result;
// const assignResult = (res) => { result = res; };
// const doNothing = _ => {};

// describe('[Server] Auth Middleware', () => {

//   afterEach(() => {
//     requestMock.reset();
//     responseMock.reset();
//   });

//   it('Should detect undefined token', async () => {
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);
//     const res = expect(result).to.be.null;
//   });

//   it('Should detect token in \'authorization\' header', async() => {
//     requestMock.set('authorization', VALID_JWT);
//     (requestMock as any).serverConfig = optionsMockWithServerConfig.serverConfig;
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);
//     expect(result).to.eql(JWT_OBJECT);
//     expect((<any>requestMock).decoded).to.eql(JWT_OBJECT);
//   });

//   it('Should detect token in \'authentication\' header', async() => {
//     requestMock.set('authentication', VALID_JWT);
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);
//     expect(result).to.eql(JWT_OBJECT);
//   });

//   it('Should detect token in \'x-access-token\' header', async() => {
//     requestMock.set('x-access-token', VALID_JWT);
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);
//     expect(result).to.eql(JWT_OBJECT);
//   });

//   it('Should detect token in \'token\' query', async() => {
//     requestMock.query.token = VALID_JWT;
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);
//     expect(result).to.eql(JWT_OBJECT);
//   });

//   it('Should detect token in \'token\' body property', async() => {
//     requestMock.body.token = VALID_JWT;
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);
//     expect(result).to.eql(JWT_OBJECT);
//   });

//   it('Should detect expired token', async() => {
//     requestMock.body.token = EXPIRED_JWT;
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);

//     expect(result.message).to.eql('Token is expired');
//   });

//   it('Should detect invalid token', async() => {
//     requestMock.body.token = INVALID_JWT;
//     await authenticationMiddleware.checkAuthentication(requestMock)
//           .then(assignResult)
//           .catch(assignResult);

//     expect(result.message).to.eql('Token is invalid');
//   });

//   it('Should call next middleware', async () => {
//     requestMock.body.token = VALID_JWT;

//     let callbackCalled = false;
//     await authenticationMiddleware.authenticatedRoute(requestMock, responseMock, () => {
//       callbackCalled = true;
//     });
//     const res = expect(callbackCalled).to.be.true;
//   });

//   it('Should respond with code 401', async () => {
//     requestMock.body.token = INVALID_JWT;

//     await authenticationMiddleware.authenticatedRoute(requestMock, responseMock, () => {});
//     expect(responseMock._status).to.eql(401);
//   });

//   it ('Should respond with code 401', () => {
//     requestMock.ip = '123.4.5.67';

//     authenticationMiddleware.authenticatedBackendRoute(requestMock, responseMock, () => {});
//     expect(responseMock._status).to.eql(401);
//   });

//   it('Should call next middleware', async() => {
//     requestMock.body.token = VALID_JWT;
//     requestMock.set('x-backend-token', CONFIG.serverConfig.backendToken);

//     let callbackCalled = false;
//     await authenticationMiddleware.authenticatedBackendRoute(requestMock, responseMock, () => {
//       callbackCalled = true;
//     });
//     const res = expect(callbackCalled).to.be.true;
//   });

// });
