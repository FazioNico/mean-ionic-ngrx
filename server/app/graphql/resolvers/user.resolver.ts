/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-08-2017
*/

import * as mongoose from 'mongoose'

import { User, IUserModel } from "../../models/user.models";
import { Authentication } from '../../authentication';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { CONFIG } from "../../config";

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const UserResolver = {
  // this will find all users in database and return it
  index():Promise<IUserModel[]>{
    return User.find()
    .sort('deadline')
    .exec()
    .then( records => {
      return records;
    })
    .catch( error => {
      return error;
    });

  },

  // this will find a single user based on id and return it.
  single( context, options ):Promise<IUserModel>  {
    return Authentication.checkAuthentication(context)
    .then(doc => {
      // check if user token ID is same of reqest options.id
      if(doc._id != options.id || options._id){
        // return Promise.reject('user not have authorization to access.')
        throw (new Error('user not have authorization to access.'))
      }
      return doc;
    })
    .then(doc => {
      // if user is same... do stuff
      return User.findOne({ _id: options.id || options._id})
      .exec()
    })
    .then( user => {
      console.log('XXXXX', user)
      return user;
    })
    .catch( error => {
      return error;
    });



  },

  // this will insert a new user in database
  create(data:{email:string,password:string}):Promise<IUserModel|any> {
    // check existe user in DB
    // before add new user
    // find the user
    return User.findOne({email: data.email})
    .exec()
    .then((userFinded:IUserModel) => {
      if (!userFinded) {
        // Check password length is >= 6
        if(data.password.length < CONFIG.passwordMinLenght) {
          console.log('Error: password require min 6 chars.');
          throw (new Error('password require min 6 characters'));
        }
        return true
      }
      else {
        console.log('XXX',userFinded)
        throw (new Error('User already existe'))
      }
    })
    .then(_=> {
      console.log('hasing...')
      return bcrypt.hash(data.password, CONFIG.bcryptRound)
    })
    .then((hash:string)=> {
      // create user
      return new User({
        email: data.email,
        password: hash,
        admin: false
      });
    })
    .then((newUser:IUserModel) => {
      console.log('saveing...')
      return newUser.save()
    })
    .then( (result) => {
      return result;
    })
    .catch(err=> {
      console.log('catch final')
      return err
    })
  },

  // this will update existing record in database
  /*
  Exemple with Postman:
  {
      "query": "mutation ($id:ID!,$admin:Boolean) { updateUser(id:$id,admin: $admin) {id, email, admin} }",
      "variables": {
          "id": "59952cb5bd134935a0df5663",
  		    "admin": true
      }
  }
   */
  update(context, data):Promise<IUserModel> {
    return Authentication.checkAuthentication(context)
    .then(doc => {
      // check if user token ID is same of reqest data.id

      if(doc._id != (data.id || data._id)){
        console.log(doc._id, data.id || data._id)
        // return Promise.reject({message:'user not have authorization to update user.'})
        throw (new Error('you not have authorization to update this user.'))
      }
      return
    })
    .then(_=> {
      return User.findOne({ _id: (data.id || data._id)})
      //.exec()
    })
    .then( (user) => {
        Object.keys(data).map( field => {
          user[field] = data[field];
        });
        return user.save().then(result => {console.log('result->',data);return result})
    })
    .then( updated => {

      return updated;
    })
    .catch( (error) => {
      return error;
    });
  },

  // this will remove the record from database.
  delete( context, options ):Promise<{status:boolean,id:string}> {
    return Authentication.checkAuthentication(context)
    .then(doc => {
      // check if user token ID is same of reqest data.id

      if(doc._id != (options.id || options._id)){
        console.log(doc._id, options.id || options._id)
        // return Promise.reject({message:'user not have authorization to update user.'})
        throw (new Error('you not have authorization to update this user.'))
      }
      return
    })
    .then(_=> {
      return User.findById( (options.id || options._id))
      .exec()
    })
    .then( item => {
      item.remove();
      return { status: true, id:(options.id || options._id) };
    })
    .catch( error => {
      return error;
    });
  },

  auth(options):Promise<IUserModel> {
    return User.findOne({email: options.email})
    .exec()
    .then( userFinded => {
      if (!userFinded) {
        //return Promise.reject('Authentication failed. User not found.')
        throw (new Error('Authentication failed. User not found.' ));
      }
      // use bcrypt to .compare() userFinded.password with options.password
      //return bcrypt.compare(options.password, userFinded.password)
      return bcrypt.compare(options.password, userFinded.password)
      .then(result=> {
        //console.log('user auth', result)
        if (result === false) {
            throw (new Error('Authentication failed. Wrong password.'))
        }
        if (result === true){
          // if result true => create token with jwt.sign()
          // return response object with token & user
          var token = jwt.sign(userFinded, CONFIG.secretTokent, {
            expiresIn: CONFIG.jwtExpire // expires in 24 hours
          });

          // return the information including token as JSON
          return {
            user: userFinded,
            token: token
          };
        }
        else {
          throw (new Error(`Authentication failed. Error with compare password->  ${result}`));
        }
      })
    })
    .catch( error => {
      console.log('catch final')
      return error;
    });

  },

  isAuth(context):Promise<any>{
      return Authentication.checkAuthentication(context)
      .then( (isAuth:any)=> {
        return User.findById(toObjectId(isAuth.user._id))
                   .exec()
      })
      .then(user => {
        return user
      })
      .catch(err => {
        return err;
      })
  }
};
