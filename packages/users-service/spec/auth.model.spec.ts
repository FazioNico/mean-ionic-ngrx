// import {} from 'mocha';
// import * as chai from 'chai';
// import * as mongoose from 'mongoose';
// import { authSchema, IAuthDoc } from '../src/auth.model';
// import { VALID_BCRYPT_HASH } from '../../../test/mocks';

// const expect = chai.expect;
// const model = mongoose.model<IAuthDoc>('auths', authSchema);

// describe('[Server] Auth Model', () => {

//   it('Should require password', async () => {

//     const inst = new model({});
//     const result: any = inst.validateSync();
//     const { errors = {} } = result;
//     const { password = null } = errors;

//     const res = expect(password).exist
//                                 .and.have.property('kind')
//                                 .and.to.eql('required');
//   });

//   it('Should validate password', async () => {

//     const inst = new model({ password: 'abc' });
//     const result: any = inst.validateSync();
//     const { errors = {} } = result;
//     const { password = null } = errors;

//     const res = expect(password).exist
//                                 .and.have.property('kind')
//                                 .and.to.eql('regexp');
//   });

//   it('Should require email', async () => {

//     const inst = new model({ password: VALID_BCRYPT_HASH });
//     const result: any = inst.validateSync();
//     const { errors = {} } = result;
//     const { email = null } = errors;

//     const res = expect(email).exist
//                               .and.have.property('kind')
//                               .and.to.eql('required');
//   });

//   it('Should validate email', async () => {

//     const inst = new model({ password: VALID_BCRYPT_HASH, email: 'abc' });
//     const result: any = inst.validateSync();
//     const { errors = {} } = result;
//     const { email = null } = errors;

//     const res = expect(email).exist
//                               .and.have.property('kind')
//                               .and.to.eql('regexp');
//   });

//   it('Should validate all', async () => {

//     const inst = new model({ password: VALID_BCRYPT_HASH, email: 'test@example.org' });
//     const result: any = inst.validateSync();

//     const res = expect(result).to.be.undefined;
//   });
// });
