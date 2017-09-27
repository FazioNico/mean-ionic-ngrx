/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
*/

import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { User, IUserModel } from './user.model';
import {Authentication} from '../../authentication';
// Import config
import { SECRET_TOKEN_KEY, BCRYPT_ROUND, PASSWORD_MIN_LENGHT, JWT_EXPIRE} from "../../../config";

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
    bcrypt.hash('A123456', BCRYPT_ROUND, (err, hash) =>{
      if(err){
        console.log('User saved successfully');
        res.json({ success: false, message: 'Error with bcrypt hash password' });
        return
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
          res.json({ success: false, message: 'Error with save user mokup' });
          return;
        };
        console.log('User saved successfully');
        res.json({ success: true });
  		})
    });
	},

	signup : (req,res) =>{
    console.log('req.body-> ', req.body);
		//(new User(<IUserModel>req.body))
    // check existe user in DB
    // before add new user
    // find the user
    User.findOne({email: req.body.email}, (err, user:IUserModel)=> {
      if (err) throw err;
      if (!user) {
        // No existing user found, create the new user
        // Check password length is >= 6
        if(req.body.password.length < PASSWORD_MIN_LENGHT) {
          console.log('User saved successfully');
          res.json({ success: false, message: 'Error password require min 6 characters' });
          return
        }
        // Use bcrypte to encrypte user password
        bcrypt.hash(req.body.password, BCRYPT_ROUND, (err, hash) =>{
          if(err){
            console.log('User saved successfully');
            res.json({ success: false, message: 'Error with bcrypt hash password' });
            return
          }
          // create user
          var newuser = <IUserModel>new User({
            email: req.body.email,
            password: hash,
            admin: false
          });
          newuser.save((err, doc:IUserModel) => {
      			if(err) return console.log(err);
            console.log('User saved successfully', doc);
            res.json({ success: true, message: 'User created successfully', user: doc});
      		})
        })

      }
      else {
        // User alerady existe un DB
        res.json({ success: false, message: 'User already existe'});
      }
    });
	},
  isAuth: (req,res)=> {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      //console.log('looog-> ', doc)
      if (isAuth) {
        //console.log('isAuth-> ', isAuth.user._id, 'req.params.id-> ',  req.params.id)
        // the user has a proper token
        // Send request to database
    		User.findById(toObjectId(isAuth.user._id), (err, doc:IUserModel) => {
    			if(err) res.json(err);
          if(doc === null){
            res.json({ success: false, message: 'isAuth failed. User not exist', user: isAuth.user});
            return console.log('isAuth failed. User not exist')
          }
          res.json(doc);
        })
      }
      else {
        res.json({ success: false, message: 'No user token finded'});
      }
    });
	},
  auth: (req,res)=> {
    // find the user
    User.findOne({email: req.body.email}, (err, user:IUserModel)=> {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if (user) {
        // check if password matches
        // Load hash from your password DB.
        // Use bcrypte to compare user password with hash
        bcrypt.compare(req.body.password, user.password, (err, result)=> {
            // res == true
            if(err){
              res.json({ success: false, message: 'Authentication failed. Error with compare password: Error-> ', err });
              return;
            }
            if (result === false) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else if (result === true){
              // if user is found and password is right
              // create a token
              var token = jwt.sign(user, SECRET_TOKEN_KEY, {
                expiresIn: JWT_EXPIRE // expires in 24 hours
              });
              // return the information including token as JSON
              res.json({
                success: true,
                message: 'Enjoy your token!',
                user: user,
                token: token
              });
            }
            else {
              res.json({ success: false, message: 'Authentication failed. Error with compare password: res-> ', res });
              return;
            }

        });
      }
    });
  },
  getAll : (req,res) => {
		User.find((err, docs:IUserModel[]) => {
			if(err) return console.log(err);
      // remove password user from datas
      let docsReady = docs.map((user)=>{
        return {
          _id: user._id,
          email: user.email,
          admin: user.admin
        }
      })
			res.json(docsReady);
		})
	},
  getUser: (req,res) => {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      //console.log('looog-> ', doc)
      if (isAuth) {
        //console.log('isAuth-> ', isAuth.user._id, 'req.params.id-> ',  req.params.id)
        // the user has a proper token & is the same of the req.params.id: let's call next
        if(isAuth.user._id === req.params.id){
          // Send request to database
      		User.findById(toObjectId(req.params.id), (err, doc:IUserModel) => {
      			if(err) return console.log(err);
            res.json(doc);
          })

        }
        else {
          res.status(403).json({
            message: 'Unauthorized access to this part of the API',
            success: false
          });
        }
      }
    });
	},
}
