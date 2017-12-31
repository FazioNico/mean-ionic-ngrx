/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 31-12-2017
*/

import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator/check';

import { User, IUserModel } from '../../../models/user.models';
import {Authentication} from '../../../authentication';
import { userDataValidator } from "./users.validator";

// Import config
import { CONFIG, responseNormalizer } from "../../../config";

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const userController = {
  // Route to add mokup user in MongoDB
  /*
    User connection info:
      email:  aa@aa.ch
      pwd:    A123456
  */
	setup : (req,res) =>{
    // Use bcrypte to encrypte user password
    bcrypt.hash('A123456', CONFIG.bcryptRound, (err, hash) =>{
      if(err){
        return res.status(400).json(
          responseNormalizer(400, null, 'Error with bcrypt hash password')
        )
      }
      // Store hash in your password DB.
      // create a sample user
      //(new User(<IUserModel>req.body))
      var newuser = <IUserModel>new User({
        email: 'aa@aa.ch',
        password: hash,
        admin: true
      });
      newuser.save((err, doc:IUserModel) => {
  			if(err) {
          console.log('save user mokup-> ',err)
          return res.status(400).json(
            responseNormalizer(400, null, 'Error with save user mock')
          );
        };
        console.log('User saved successfully');
        res.json(responseNormalizer(200, null, 'User Mock save successfully'));
  		})
    });
	},

	signup : (req,res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseNormalizer(422, errors.mapped(), 'Error with validation datas'))
      //return res.status(422).json({ errors: errors.mapped() })
    }
    //(new User(<IUserModel>req.body))
    // check existe user in DB
    // before add new user
    // find the user
    User.findOne({email: req.body.email}, (err, user:IUserModel)=> {
      if (err) {
        console.log('errr!!')
        return res.status(400).json(responseNormalizer(400, {error:err.message}))
      };
      if (!user) {
        // No existing user found, create the new user
        // Check password length is >= 6
        if(req.body.password.length < CONFIG.passwordMinLenght) {
          return res.status(400).json(responseNormalizer(400,{error:'Error password require min 6 characters'}));
        }
        // Use bcrypte to encrypte user password
        bcrypt.hash(req.body.password, CONFIG.bcryptRound, (err, hash) =>{
          if(err){
            return res.status(400).json(responseNormalizer(400,{error:'Error with bcrypt hash password'}));
          }
          // create user
          var newuser = <IUserModel>new User({
            email: req.body.email,
            password: hash,
            admin: false
          });
          newuser.save((err, doc:IUserModel) => {
      			if(err) return res.status(400).json(responseNormalizer(400, {error:err}, 'Error on save User'));
            // creat token auth
            var token = jwt.sign({_id:doc._id,email:doc.email}, CONFIG.secretTokent, {
              expiresIn: CONFIG.jwtExpire // expires in 24 hours
            });
            // console.log('XXXXX token-> ', token)
            doc.password = null;
            // return the information including token as JSON
            return res.json(responseNormalizer(200, {user: doc, token}, 'User created successfully'));
      		})
        })

      }
      else {
        // User alerady existe un DB
        return res.status(400).json(responseNormalizer(400, {error:'User already existe'}));
      }
    })
    .catch(err=> {
      console.log('errr!!')
      return res.status(400).json(responseNormalizer(400, {error:err}, 'Error User ID not exist into users collection'));
    });
	},
  isAuth: (req,res)=> {
    Authentication.checkAuthentication(req)
    .then(isAuth=> {
      if (isAuth) {
        // the user has a proper token
        // Send request to database
    		User.findById(toObjectId(isAuth._id), (err, doc:IUserModel) => {
    			if(err) {
            return res.status(400).json(responseNormalizer(400, {error:err}, 'Error...'))
          };
          if(doc === null){
            return res.status(400).json(responseNormalizer(400, {error:'isAuth failed. User not exist'}));
            // res.json({ success: false, message: 'isAuth failed. User not exist'});
            // return console.log('isAuth failed. User not exist')
          }
          doc.password = null;
          return res.json(responseNormalizer(200, {isAuth:doc}, 'success'));
        })
      }
      else {
        return res.status(403).json(responseNormalizer(403, null, 'No user token finded'));
      }
    })
    .catch(
      err => res.status(403).json(responseNormalizer(403, err, 'No user token finded'))
    );
	},
  auth: (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(responseNormalizer(422, {error:errors.mapped()}, 'validation error'))
    }
    // find the user
    User.findOne({email: req.body.email}, (err, user:IUserModel)=> {
      if (err) throw err;
      if (!user) {
        return res.status(400).json(responseNormalizer(400, {error:'Authentication failed. User not found.'} ));
      }
      else if (user) {
        // check if password matches
        // Load hash from your password DB.
        // Use bcrypte to compare user password with hash
        bcrypt.compare(req.body.password, user.password, (err, result)=> {
            if(err){
              return res.status(400).json(responseNormalizer(400, {error:err}, 'Authentication failed. Error with compare password.' ));
            }
            if (result === false) {
              return res.status(400).json(responseNormalizer(400, {error:err}, 'Authentication failed. Wrong password.' ));
            }
            else if (result === true){
              // if user is found and password is right
              // create a token
              var token = jwt.sign({_id:user._id,email:user.email}, CONFIG.secretTokent, {
                expiresIn: CONFIG.jwtExpire // expires in 24 hours
              });
              user.password = null;
              // return the information including token as JSON
              return res.json(responseNormalizer(200,{user,token},'Enjoy your token!'));
            }
            else {
              return res.status(400).json(responseNormalizer(400, {error:err}, 'Authentication failed. Error with compare password'));
            }
        });
      }
    });
  },
  getAll : (req,res) => {
		User.find((err, docs:IUserModel[]) => {
			if(err)  {
        return res.status(400).json(responseNormalizer(400, {error:err}, 'Cannot find users[]' ));
      };
      // remove password user from datas
      let docsReady = docs.map((user)=>{
        return {
          _id: user._id,
          email: user.email,
          admin: user.admin
        }
      })
      return res.status(200).json(responseNormalizer(200, {users:docsReady} ));
		});
	},
  getUser: (req,res) => {
    Authentication.checkAuthentication(req)
    .then(isAuth=> {
      if (isAuth) {
        //console.log('isAuth-> ', isAuth.user._id, 'req.params.id-> ',  req.params.id)
        // the user has a proper token & is the same of the req.params.id: let's call next
        if(isAuth._id === req.params.id){
          // Send request to database
      		User.findById(toObjectId(req.params.id), (err, doc:IUserModel) => {
      			if(err) {
              return res.status(400).json(responseNormalizer(400, {error:err}, 'Error with User.findByID'))
            };
            doc.password = null;
            return res.json(responseNormalizer(200,{user:doc}));
          })
        }
        else {
          return res.status(403).json(responseNormalizer(403, null, 'Unauthorized access to this part of the API'));
        }
      }
    });
	},
}
