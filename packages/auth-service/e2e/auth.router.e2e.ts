// import {} from 'mocha';
// import { AuthModule } from '../src/auth.module';
// import * as express from 'express';
// import { CONFIG } from '../src/config';
// import * as request from 'supertest';
// import { authenticationMiddleware, toObjectId, fetcher, IAgModule } from '@agenda.ch/backend-utils';
// import {
//   NON_EXISTING_ID,
//   VALID_JWT,
//   PASSWORD_HASH,
//   PASSWORD_PLAIN,
//   dbMock,
//   dbMockBehavior,
//   createSpy,
//   ISpy,
//   createFetchMock,
//   permissionsFullMock
// } from '../../../test/mocks';

// let apiServer: request.SuperTest<request.Test>;

// let spies: ISpy[] = [];

// const OPTIONS = {
//       db: dbMock,
//       middlewares: {
//         auth: authenticationMiddleware,
//       },
//       serverConfig: CONFIG.serverConfig
//     };
// const authModule: IAgModule = new AuthModule(OPTIONS);

// const xFullPermissions2 = JSON.stringify(permissionsFullMock);

// describe('[Server e2e] Auth Router', () => {


//   before(async () => {

//     const serverConfig = Object.assign({}, CONFIG.serverConfig, {logger: () => {}});
//     /** step 5: define  module options */
//     const OPTIONS = {
//       db: dbMock || [],
//       middlewares: {
//           // auth: {
//           //     authenticatedRoute: (req, res, next) => next(), // to tesating without authenticationMiddleware.
//           //     authenticatedBackendRoute:(req, res, next) => next()
//           // }
//           auth: authenticationMiddleware
//       },
//       serverConfig,
//     };
//     await authModule.init(null);
//   });

//   afterEach(() => {
//     dbMock.reset();
//     spies.forEach(spy => spy.reset());
//     spies = [];
//   });

//   after(async () => {
//     await authModule.close();
//     dbMock.reset();
//   });

//   it('Should return 200 http code for GET /isauth', (done) => {
//     spies = [
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//       ]),
//     ];
//     apiServer.get(`/auth/isauth`)
//              .set('Authorization', VALID_JWT)
//              .expect(200, done);
//   });

//   it('Should return 200 http code for GET /isauth', (done) => {
//     spies = [
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         createFetchMock(200, {permissions: {...permissionsFullMock}}),
//         createFetchMock(200, {user: {uid: NON_EXISTING_ID}}),
//         createFetchMock(200, {})
//       ]),
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT)
//     ];
//     apiServer.get(`/auth/isauth?loadUserData=true`)
//              .set('Authorization', VALID_JWT)
//              .expect(200, done);
//   });

//   it('Should return 400 http code for GET /isauth [1]', (done) => {
//     spies = [
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, {permissions: {...permissionsFullMock}}),
//         createFetchMock(200, {user: {uid: NON_EXISTING_ID}}),
//         createFetchMock(400, {})
//       ]),
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT)
//     ];
//     apiServer.get('/auth/isauth?loadUserData=true')
//              .set('Authorization', VALID_JWT)
//              .expect(400, done);
//   });

//   it('Should return 400 http code for GET /isauth [2]', (done) => {
//     spies = [
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, {permissions: {...permissionsFullMock}}),
//         createFetchMock(400, {}),
//       ]),
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT)
//     ];
//     apiServer.get('/auth/isauth?loadUserData=true')
//              .set('Authorization', VALID_JWT)
//              .expect(400, done);
//   });

//   it('Should return 400 http code for GET /isauth [3]', (done) => {
//     spies = [
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         createFetchMock(400, {}),
//       ]),
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT)
//     ];
//     apiServer.get('/auth/isauth?loadUserData=true')
//              .set('Authorization', VALID_JWT)
//              .expect(400, done);
//   });

//   it('Should return 401 http code for GET /isauth', (done) => {
//     apiServer.get('/auth/isauth')
//              .expect(401, done);
//   });


//   it('Should return 200 http code for POST / (login)', (done) => {
//     spies = [
//       createSpy(authModule.repo, 'auth', true, Promise.resolve({token: VALID_JWT, user: {_id: NON_EXISTING_ID}})),
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, {permissions: {...permissionsFullMock}, user: {uid: NON_EXISTING_ID}, userConfig: {} }),
//         createFetchMock(200, {accounts: [{uid: NON_EXISTING_ID}]}),
//       ]),
//     ];
//     apiServer.post('/auth')
//              .set('Authorization', VALID_JWT)
//              .send({
//                email: 'email@example.com',
//                password: PASSWORD_PLAIN
//              })
//              .expect(200, done);
//   });

//   it('Should return 400 http code for POST / (login)', (done) => {
//     spies = [
//       createSpy(authModule.repo, 'auth', true, Promise.resolve({token: VALID_JWT, user: {_id: NON_EXISTING_ID}})),
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, {permissions: {...permissionsFullMock}, user: {uid: NON_EXISTING_ID}, userConfig: {} }),
//         createFetchMock(400, {accounts: [{uid: NON_EXISTING_ID}]}),
//       ]),
//     ];
//     apiServer.post('/auth')
//              .set('Authorization', VALID_JWT)
//              .send({
//                email: 'email@example.com',
//                password: PASSWORD_PLAIN
//              })
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST / (login with error retrieve user)', (done) => {
//     spies = [
//       createSpy(authModule.repo, 'auth', true, Promise.resolve({token: VALID_JWT, user: {_id: NON_EXISTING_ID}})),
//       createSpy(authModule.repo, 'getToken', true, VALID_JWT),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(400, {user: {uid: NON_EXISTING_ID}}),
//       ]),
//     ];
//     apiServer.post('/auth')
//              .send({
//                email: 'email@example.com',
//                password: PASSWORD_PLAIN
//              })
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST / (login with auth error)', (done) => {
//     spies = [
//       createSpy(authModule.repo, 'auth', true, Promise.reject({token: VALID_JWT, user: {_id: NON_EXISTING_ID}})),
//     ];
//     apiServer.post('/auth')
//              .send({
//                email: 'email@example.com',
//                password: PASSWORD_PLAIN
//              })
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST / (login without creds)', (done) => {
//     apiServer.post('/auth')
//              .send({})
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST / (login without password)', (done) => {
//     apiServer.post('/auth')
//              .send({email: 'email'})
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST / (login without email)', (done) => {
//     apiServer.post('/auth')
//             .send({password: 'password'})
//             .set('Content-Type', 'application/json')
//             .expect(400, done);
//   });

//   it('Should return 200 http code for POST /signin', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'signin',
//                 true,
//                 Promise.resolve({AuthUser: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         // create user
//         Promise.resolve({ status: 200, json: () => (Promise.resolve({user: {uid: NON_EXISTING_ID}}))}),
//         // create account (and agenda + accountConfig)
//         Promise.resolve({ status: 200, json: () => (Promise.resolve({account: {_id: NON_EXISTING_ID},
//                                                                      accountConfig: {uid: NON_EXISTING_ID},
//                                                                      agenda: {_id: NON_EXISTING_ID}}))}),
//         // create permissions
//         Promise.resolve({ status: 200, json: () => (Promise.resolve({permissions: {}}))}),
//         // create userConfig
//         Promise.resolve({ status: 200, json: () => (Promise.resolve({userConfig: {}}))}),
//       ]),
//     ];
//     apiServer.post('/auth/signin')
//              .send({
//                 email: 'email@example.com',
//                 password: 'password',
//                 firstname: 'John',
//                 lastname: 'Doe',
//                 company: 'Company Ltd',
//                 address: 'address',
//                 city: 'city',
//                 country: 'country',
//                 state: 'state',
//                 zipCode: 'zipCode',
//                 phone: 'phone'
//              })
//              .set('Content-Type', 'application/json')
//              .expect(200, done);
//   });

//   it('Should return 400 http code for POST /signin', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'signin',
//                 true,
//                 Promise.resolve({AuthUser: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({AuthUser: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         // create user
//         createFetchMock(200, {user: {uid: NON_EXISTING_ID}}),
//         // create account (and agenda + accountConfig)
//         createFetchMock(200, {account: {_id: NON_EXISTING_ID},
//           accountConfig: {uid: NON_EXISTING_ID},
//           agenda: {_id: NON_EXISTING_ID}}),
//         // create permissions
//         createFetchMock(200, {permissions: {}}),
//         // create userConfig
//         createFetchMock(400, {}),
//         // delete created objects
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//       ]),
//     ];
//     apiServer.post('/auth/signin')
//              .send({
//                 email: 'email@example.com',
//                 password: 'password',
//                 firstname: 'John',
//                 lastname: 'Doe',
//                 company: 'Company Ltd',
//                 address: 'address',
//                 city: 'city',
//                 country: 'country',
//                 state: 'state',
//                 zipCode: 'zipCode',
//                 phone: 'phone'
//              })
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST /signin', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'signin',
//                 true,
//                 Promise.resolve({AuthUser: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({AuthUser: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         // create user
//         createFetchMock(200, {user: {uid: NON_EXISTING_ID}}),
//         // create account (and agenda + accountConfig)
//         createFetchMock(200, {account: {_id: NON_EXISTING_ID},
//                               accountConfig: {uid: NON_EXISTING_ID},
//                               agenda: {_id: NON_EXISTING_ID}}),
//         // create permissions
//         createFetchMock(400, {permissions: {}}),
//         // delete created objects
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//       ]),
//     ];
//     apiServer.post('/auth/signin')
//              .send({
//                 email: 'email@example.com',
//                 password: 'password',
//                 firstname: 'John',
//                 lastname: 'Doe',
//                 company: 'Company Ltd',
//                 address: 'address',
//                 city: 'city',
//                 country: 'country',
//                 state: 'state',
//                 zipCode: 'zipCode',
//                 phone: 'phone'
//              })
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });


//   it('Should return 400 http code for POST /signin', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'signin',
//                 true,
//                 Promise.resolve({AuthUser: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         // create user
//         createFetchMock(200, {user: {uid: NON_EXISTING_ID}}),
//         // create account (and agenda + accountConfig)
//         createFetchMock(400, {account: {_id: NON_EXISTING_ID},
//                               accountConfig: {uid: NON_EXISTING_ID},
//                               agenda: {_id: NON_EXISTING_ID}}),
//         // delete created objects
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//       ]),
//     ];
//     apiServer.post('/auth/signin')
//              .send({
//                 email: 'email@example.com',
//                 password: 'password',
//                 firstname: 'John',
//                 lastname: 'Doe',
//                 company: 'Company Ltd',
//                 address: 'address',
//                 city: 'city',
//                 country: 'country',
//                 state: 'state',
//                 zipCode: 'zipCode',
//                 phone: 'phone'
//              })
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST /signin', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'signin',
//                 true,
//                 Promise.resolve({AuthUser: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         // create user
//         createFetchMock(400, {user: {uid: NON_EXISTING_ID}}),
//         // delete created objects
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//         createFetchMock(200, {}),
//       ]),
//     ];
//     apiServer.post('/auth/signin')
//              .send({
//                 email: 'email@example.com',
//                 password: 'password',
//                 firstname: 'John',
//                 lastname: 'Doe',
//                 company: 'Company Ltd',
//                 address: 'address',
//                 city: 'city',
//                 country: 'country',
//                 state: 'state',
//                 zipCode: 'zipCode',
//                 phone: 'phone'
//              })
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST /signin', (done) => {
//     apiServer.post('/auth/signin')
//              .send({})
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 200 http code for POST /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'create',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // create user
//         createFetchMock(200, { user: { _id: NON_EXISTING_ID} }),
//         createFetchMock(200, { permissions: {} }),
//         createFetchMock(200, { })
//       ]),
//     ];
//     apiServer.post('/auth/' + NON_EXISTING_ID)
//              .send({
//                auth: { _id: NON_EXISTING_ID },
//                user: { _id: NON_EXISTING_ID },
//                permissions: { _id: NON_EXISTING_ID },
//              })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(200, done);
//   });

//   it('Should return 400 http code for POST /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'create',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // create user
//         createFetchMock(200, { user: { _id: NON_EXISTING_ID} }),
//         createFetchMock(200, { permissions: {} }),
//         createFetchMock(400, { }),
//         // in catch block, delete created objs
//         createFetchMock(200, { }),
//         createFetchMock(200, { }),
//       ]),
//     ];
//     apiServer.post('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'create',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // create user
//         createFetchMock(200, { user: { _id: NON_EXISTING_ID} }),
//         createFetchMock(400, { permissions: {} }),
//         // in catch block, delete created objs
//         createFetchMock(200, { }),
//         createFetchMock(200, { }),
//       ]),
//     ];
//     apiServer.post('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'create',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // create user
//         createFetchMock(400, { user: { _id: NON_EXISTING_ID} }),
//         // in catch block, delete created objs
//         createFetchMock(200, { }),
//         createFetchMock(200, { }),
//       ]),
//     ];
//     apiServer.post('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for POST /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'create',
//                 true,
//                 Promise.reject({})),
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // in catch block, delete created objs
//         createFetchMock(200, { }),
//         createFetchMock(200, { }),
//       ]),
//     ];
//     apiServer.post('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 401 http code for POST /:aid', (done) => {
//     apiServer.post('/auth/' + NON_EXISTING_ID)
//              .expect(401, done);
//   });

//   it('Should return 403 http code for POST /:aid', (done) => {
//     apiServer.post('/auth/' + NON_EXISTING_ID)
//              .set('Authorization', VALID_JWT)
//              .expect(403, done);
//   });

//   it('Should return 200 http code for PUT /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'update',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // create user
//         createFetchMock(200, { user: { _id: NON_EXISTING_ID} }),
//         createFetchMock(200, { permissions: {} }),
//       ]),
//     ];
//     apiServer.put('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(200, done);
//   });

//   it('Should return 400 http code for PUT /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'update',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // create user
//         createFetchMock(200, { user: { _id: NON_EXISTING_ID} }),
//         createFetchMock(400, { permissions: {} }),
//       ]),
//     ];
//     apiServer.put('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for PUT /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'update',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//         // create user
//         createFetchMock(400, { user: { _id: NON_EXISTING_ID} }),
//       ]),
//     ];
//     apiServer.put('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 400 http code for PUT /:aid', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'update',
//                 true,
//                 Promise.reject({})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//       ]),
//     ];
//     apiServer.put('/auth/' + NON_EXISTING_ID)
//              .send({
//                 auth: { _id: NON_EXISTING_ID },
//                 user: { _id: NON_EXISTING_ID },
//                 permissions: { _id: NON_EXISTING_ID },
//               })
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 401 http code for PUT /:aid', (done) => {
//     apiServer.put('/auth/' + NON_EXISTING_ID)
//              .send({})
//              .set('Content-Type', 'application/json')
//              .expect(401, done);
//   });

//   it('Should return 403 http code for PUT /:aid', (done) => {
//     apiServer.put('/auth/' + NON_EXISTING_ID)
//              .send({})
//              .set('Content-Type', 'application/json')
//              .set('Authorization', VALID_JWT)
//              .expect(403, done);
//   });

//   it('Should return 200 http code for DELETE /:id', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//       ]),
//     ];
//     apiServer.delete('/auth/' + NON_EXISTING_ID)
//              .set('Authorization', VALID_JWT)
//              .set('x-backend-token', CONFIG.serverConfig.backendToken)
//              .set('Content-Type', 'application/json')
//              .expect(200, done);
//   });

//   it('Should return 200 http code for DELETE /:id', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.resolve({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//       ]),
//     ];
//     apiServer.delete('/auth/' + NON_EXISTING_ID)
//              .set('Authorization', VALID_JWT)
//              .set('x-backend-token', CONFIG.serverConfig.backendToken)
//              .set('Content-Type', 'application/json')
//              .expect(200, done);
//   });

//   it('Should return 400 http code for DELETE /:id', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.reject({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//       createSpy(fetcher, 'fetch', true, undefined, [
//         createFetchMock(200, { permissions: permissionsFullMock }),
//       ]),
//     ];
//     apiServer.delete('/auth/' + NON_EXISTING_ID)
//              .set('Authorization', VALID_JWT)
//              .set('x-backend-token', CONFIG.serverConfig.backendToken)
//              .set('Content-Type', 'application/json')
//              .expect(400, done);
//   });

//   it('Should return 401 http code for DELETE /:id', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.reject({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//     ];
//     apiServer.delete('/auth/' + NON_EXISTING_ID)
//              .set('x-backend-token', CONFIG.serverConfig.backendToken)
//              .set('Content-Type', 'application/json')
//              .expect(401, done);
//   });

//   it('Should return 403 http code for DELETE /:id', (done) => {
//     spies = [
//       createSpy(authModule.repo,
//                 'delete',
//                 true,
//                 Promise.reject({auth: {_id: toObjectId(NON_EXISTING_ID)}})),
//     ];
//     apiServer.delete('/auth/' + NON_EXISTING_ID)
//              .set('Authorization', VALID_JWT)
//              .set('Content-Type', 'application/json')
//              .expect(403, done);
//   });
// });
