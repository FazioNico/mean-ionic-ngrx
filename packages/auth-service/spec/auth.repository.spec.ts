// import {} from 'mocha';
// import * as chai from 'chai';
// import * as bcrypt from 'bcryptjs';
// const expect = chai.expect;
// import { AuthRepo } from '../src/auth.repository';
// import { promiseErrorFactory } from '@agenda.ch/backend-utils';
// import { CONFIG } from '../src/config';
// import {
//   NON_EXISTING_ID,
//   dbMock,
//   dbMockBehavior,
//   createSpy,
//   ISpy,
//   mockBcrypt,
//   restoreBcrypt,
// } from '../../../test/mocks';

// let result;
// const assignResult = (res) => { result = res; };
// const doNothing = _ => {};

// let spies: ISpy[] = [];

// describe('[Server] Auth Repository', () => {

//   afterEach(async () => {
//     dbMock.reset();
//     spies.forEach(spy => spy.reset());
//     spies = [];
//     restoreBcrypt();
//   });

//   it('Should require DB connection to start', async () => {
//     await new AuthRepo().init(null, null)
//                     .then(assignResult)
//                     .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not available!'));
//   });

//   it('Should require open DB connection to start', async () => {
//     dbMock.disconnect();
//     await new AuthRepo().init(dbMock as any, null)
//                     .then(assignResult)
//                     .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not connected!'));
//   });

//   it('Should require server configuration to start', async () => {
//     await new AuthRepo().init(dbMock as any, null)
//                     .then(assignResult)
//                     .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} Auth repository must be started with server configuration'));
//   });

//   it('Should store server config', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     expect(repo.serverConfig).to.eql(CONFIG.serverConfig);
//   });

//   it('Should detect empty password to compare', () => {
//     const repo: any = new AuthRepo();
//     const res = expect(repo._comparePassword('', '')).to.be.false;
//   });

//   it('Should need email and id to get token', async () => {
//     const repo: any = new AuthRepo();
//     await repo.init(dbMock, CONFIG.serverConfig);
//     expect(repo.getToken({})).to.eql('');
//     expect(repo.getToken({_id: 'id'})).to.eql('');
//   });

//   it('Should create mongoose model', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     expect(repo.model).to.be.an.instanceof(Object);
//   });

//   it ('Should not be auth (error)', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.isAuth(NON_EXISTING_ID)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql(`{AuthRepo} isAuth failed. User don't exist.`);
//     expect(result.errorObj).to.be.an.instanceof(Error);
//   });

//   it ('Should not be auth', async () => {
//     dbMock.findBehavior = dbMockBehavior.returnNull;
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.isAuth(NON_EXISTING_ID)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory(`{AuthRepo} isAuth failed. User don't exist.`));
//   });

//   it ('Should be auth', async () => {
//     dbMock.findBehavior = dbMockBehavior.returnObject;
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.isAuth(NON_EXISTING_ID)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql({auth: {}});
//   });

//   it ('Should not authenticate with wrong email', async () => {
//     dbMock.findBehavior = dbMockBehavior.returnNull;
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.auth('email', '')
//               .then(assignResult)
//               .catch(assignResult);
//     delete result.errorObj; // can't reproduce stack trace in Error object
//     expect(result).to.eql(promiseErrorFactory(`{AuthRepo} Authentication failed. User email not found.`));
//   });

//   it ('Should not authenticate with wrong password', async () => {
//     spies = [createSpy(bcrypt, 'compareSync', true, false)];
//     dbMock.findBehavior = dbMockBehavior.returnObject;
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.auth('email', 'password')
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory(`{AuthRepo} Authentication failed. Error with compare password.`));
//   });

//   it('Should authenticate', async() => {
//     const mock = {password: 'password'};
//     dbMock.setWorkflow([{password: 'password'}]);
//     const repo = new AuthRepo();
//     spies = [
//       createSpy(bcrypt, 'compareSync', true, true),
//       createSpy(repo, 'getToken', true, 'token')
//     ];
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.auth('email', 'password')
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.have.property('token');
//     expect(result).to.have.property('user')
//                   .and.to.eql(mock);
//   });

//   it('Should catch error with auth', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.auth('email', 'password')
//             .then(assignResult)
//             .catch(assignResult);
//     expect(result.message).to.eql(`{AuthRepo} An error occured fetching a data with email: ${'email'}`);
//     expect(result.errorObj).to.be.an.instanceof(Error);
//   });

//   it ('Should require email, password, firstname, lastname and company to signin', async() => {
//     const requiredFields = [
//       {email: 'john.doe@gmail.com'},
//       {password: 'User123'},
//       {firstname: 'John'},
//       {lastname: 'Doe'},
//       {company: 'New Company 99'}
//     ];
//     let body: any = {};
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);

//     for (let i = 0; i < requiredFields.length; i++) {
//       await repo.signin(body)
//                 .then(assignResult)
//                 .catch(assignResult);
//       expect(result).to.eql(promiseErrorFactory('{AuthRepo} Signin failed. Form fiels error'));
//       body = {...body, ...requiredFields[i]};
//     }
//   });

//   it('Should detect existing email', async() => {
//     dbMock.findBehavior = dbMockBehavior.returnObject;
//     const body: any = {
//       email: 'email',
//       password: 'User123',
//       firstname: 'John',
//       lastname: 'Doe',
//       company: 'New Company 99'
//     };
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.signin(body)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} User email already exists'));
//   });

//   it('Should catch error with signin', async () => {
//     const body: any = {
//       email: 'email',
//       password: 'User123',
//       firstname: 'John',
//       lastname: 'Doe',
//       company: 'New Company 99'
//     };
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.signin(body)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Sign in error');
//     expect(result.errorObj).to.be.an.instanceof(Error);
//   });

//   it('Should catch error with signin', async () => {
//     dbMock.findBehavior = dbMockBehavior.returnNull;
//     const body: any = {
//       email: 'email',
//       password: 'User123',
//       firstname: 'John',
//       lastname: 'Doe',
//       company: 'New Company 99'
//     };
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.signin(body)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Error with save AuthUser into Auth.Collection');
//     expect(result.errorObj).to.be.an.instanceof(Error);
//   });

//   it('Should catch bcrypt error', async () => {
//     dbMock.findBehavior = dbMockBehavior.returnNull;
//     mockBcrypt();
//     const body: any = {
//       email: 'email',
//       password: 'User123',
//       firstname: 'John',
//       lastname: 'Doe',
//       company: 'New Company 999'
//     };
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.signin(body)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Error with bcrypt hash password');
//     expect(result.errorObj).to.be.an.instanceof(Error);
//   });

//   it('Should do signin', async () => {
//     dbMock.setBehaviors(dbMockBehavior.returnNull, dbMockBehavior.returnObject);
//     const body: any = {
//       email: 'email',
//       password: 'User123',
//       firstname: 'John',
//       lastname: 'Doe',
//       company: 'New Company 999'
//     };
//     const repo = new AuthRepo();
//     spies = [createSpy(repo, 'getToken', true, '')];
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.signin(body)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.AuthUser).to.eql({});
//     expect(result).to.have.property('token');
//   });

//   it('Should reject creation without email and password', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.create({})
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} AuthUser creation failed. Form fiels error'));
//     await repo.create({ email: 'email'})
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} AuthUser creation failed. Form fiels error'));
//   });

//   it('Should catch error while checking existing email', async () => {
//     dbMock.setBehaviors(dbMockBehavior.fail, dbMockBehavior.fail);
//     const repo = new AuthRepo();
//     spies = [createSpy(repo, 'getToken', true, '')];
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.create({ password: 'password', email: 'email'})
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} AuthUser creation error');
//   });

//   it('Should reject creation with existing email', async () => {
//     dbMock.setBehaviors(dbMockBehavior.returnObject, dbMockBehavior.fail);
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.create({ password: 'password', email: 'email'})
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} User email already exists'));
//   });

//   it('Should catch bcrypt error', async () => {
//     mockBcrypt();
//     dbMock.setBehaviors(dbMockBehavior.returnNull, dbMockBehavior.fail);
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.create({ password: 'password', email: 'email'})
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Error with bcrypt hash password');
//   });

//   it('Should catch db error while creating auth', async () => {
//     dbMock.setBehaviors(dbMockBehavior.returnNull, dbMockBehavior.fail);
//     const repo = new AuthRepo();
//     spies = [createSpy(repo, 'getToken', true, '')];
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.create({ password: 'password', email: 'email'})
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Error with save AuthUser into Auth.Collection');
//   });

//   it('Should create auth', async () => {
//     dbMock.setBehaviors(dbMockBehavior.returnNull, dbMockBehavior.workflow);
//     const auth = { password: 'password', email: 'email' };
//     dbMock.setWorkflow([auth], false, true, false);
//     const repo = new AuthRepo();
//     spies = [createSpy(repo, 'getToken', true, '')];
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.create(auth)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql({auth});
//   });

//   it('Should reject update without id', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.update(null, null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} Object id not provided'));
//   });

//   it('Should reject update without data', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.update('123', {})
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} Values to update not provided'));
//   });

//   it('Should catch bcrypt error with update', async () => {
//     mockBcrypt();
//     dbMock.setBehaviors(dbMockBehavior.returnNull, dbMockBehavior.fail);
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.update('123', { password: 'password' })
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Error with bcrypt hash password');
//   });

//   it('Should update auth', async () => {
//     dbMock.setBehaviors(dbMockBehavior.returnObject, dbMockBehavior.returnObject);
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.update('123', { password: null })
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql({ auth: {} });
//   });

//   it('Should catch error with update', async () => {
//     dbMock.setBehaviors(dbMockBehavior.fail, dbMockBehavior.fail);
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.update('123', { password: 'password' })
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Error with update AuthUser');
//   });

//   it('Should reject delete without id', async () => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.delete(null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} Object id not provided'));
//   });

//   it('Should catch delete error', async () => {
//     dbMock.removeBehavior = dbMockBehavior.fail;
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.delete('123')
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result.message).to.eql('{AuthRepo} Unable to delete AuthUser');
//   });

//   it('Should delete auth', async () => {
//     dbMock.removeBehavior = dbMockBehavior.returnObject;
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     await repo.delete('123')
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql({ auth: {} });
//   });


//   it('Should raise error with isAuth when db disconnect', async() => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     dbMock.connection.emit('disconnect');
//     await repo.isAuth(null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not connected'));
//   });

//   it('Should raise error with auth when db disconnect', async() => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     dbMock.connection.emit('disconnect');
//     await repo.auth(null, null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not connected'));
//   });

//   it('Should raise error with signin when db disconnect', async() => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     dbMock.connection.emit('disconnect');
//     await repo.signin(null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not connected'));
//   });

//   it('Should raise error with create when db disconnect', async() => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     dbMock.connection.emit('disconnect');
//     await repo.create(null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not connected'));
//   });

//   it('Should raise error with update when db disconnect', async() => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     dbMock.connection.emit('disconnect');
//     await repo.update(null, null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not connected'));
//   });

//   it('Should raise error with delete when db disconnect', async() => {
//     const repo = new AuthRepo();
//     await repo.init(dbMock as any, CONFIG.serverConfig)
//               .then(doNothing)
//               .catch(doNothing);
//     dbMock.connection.emit('disconnect');
//     await repo.delete(null)
//               .then(assignResult)
//               .catch(assignResult);
//     expect(result).to.eql(promiseErrorFactory('{AuthRepo} DB not connected'));
//   });
// });


