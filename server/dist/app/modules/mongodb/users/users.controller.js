/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-04-2017
*/
"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var user_model_1 = require("./user.model");
var authentication_1 = require("../../authentication");
// Import config
var config_1 = require("../../../config");
var toObjectId = function (_id) {
    return mongoose.Types.ObjectId.createFromHexString(_id);
};
exports.userController = {
    // Route to add mokup user in MongoDB
    /*
      User connection info:
        email:  aa@aa.ch
        pwd:    A123456
    */
    setup: function (req, res) {
        // Use bcrypte to encrypte user password
        bcrypt.hash('A123456', config_1.BCRYPT_ROUND, function (err, hash) {
            if (err) {
                console.log('User saved successfully');
                res.json({ success: false, message: 'Error with bcrypt hash password' });
                return;
            }
            // Store hash in your password DB.
            // create a sample user
            //(new User(<IUserModel>req.body))
            var newuser = new user_model_1.User({
                email: 'aa@aa.ch',
                password: hash,
                admin: true
            });
            newuser.save(function (err, doc) {
                if (err) {
                    console.log('save user mokup-> ', err);
                    res.json({ success: false, message: 'Error with save user mokup' });
                    return;
                }
                ;
                console.log('User saved successfully');
                res.json({ success: true });
            });
        });
    },
    signup: function (req, res) {
        console.log('req.body-> ', req.body);
        //(new User(<IUserModel>req.body))
        // check existe user in DB
        // before add new user
        // find the user
        user_model_1.User.findOne({ email: req.body.email }, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                // No existing user found, create the new user
                // Check password length is >= 6
                if (req.body.password.length < config_1.PASSWORD_MIN_LENGHT) {
                    console.log('User saved successfully');
                    res.json({ success: false, message: 'Error password require min 6 characters' });
                    return;
                }
                // Use bcrypte to encrypte user password
                bcrypt.hash(req.body.password, config_1.BCRYPT_ROUND, function (err, hash) {
                    if (err) {
                        console.log('User saved successfully');
                        res.json({ success: false, message: 'Error with bcrypt hash password' });
                        return;
                    }
                    // create user
                    var newuser = new user_model_1.User({
                        email: req.body.email,
                        password: hash,
                        admin: false
                    });
                    newuser.save(function (err, doc) {
                        if (err)
                            return console.log(err);
                        console.log('User saved successfully', doc);
                        res.json({ success: true, message: 'User created successfully', user: doc });
                    });
                });
            }
            else {
                // User alerady existe un DB
                res.json({ success: false, message: 'User already existe' });
            }
        });
    },
    isAuth: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            //console.log('looog-> ', doc)
            if (isAuth) {
                //console.log('isAuth-> ', isAuth.user._id, 'req.params.id-> ',  req.params.id)
                // the user has a proper token
                // Send request to database
                user_model_1.User.findById(toObjectId(isAuth.user._id), function (err, doc) {
                    if (err)
                        res.json(err);
                    if (doc === null) {
                        res.json({ success: false, message: 'isAuth failed. User not exist', user: isAuth.user });
                        return console.log('isAuth failed. User not exist');
                    }
                    res.json(doc);
                });
            }
            else {
                res.json({ success: false, message: 'No user token finded' });
            }
        });
    },
    auth: function (req, res) {
        // find the user
        user_model_1.User.findOne({ email: req.body.email }, function (err, user) {
            if (err)
                throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            }
            else if (user) {
                // check if password matches
                // Load hash from your password DB.
                // Use bcrypte to compare user password with hash
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    // res == true
                    if (err) {
                        res.json({ success: false, message: 'Authentication failed. Error with compare password: Error-> ', err: err });
                        return;
                    }
                    if (result === false) {
                        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                    }
                    else if (result === true) {
                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, config_1.SECRET_TOKEN_KEY, {
                            expiresIn: config_1.JWT_EXPIRE // expires in 24 hours
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
                        res.json({ success: false, message: 'Authentication failed. Error with compare password: res-> ', res: res });
                        return;
                    }
                });
            }
        });
    },
    getAll: function (req, res) {
        user_model_1.User.find(function (err, docs) {
            if (err)
                return console.log(err);
            // remove password user from datas
            var docsReady = docs.map(function (user) {
                return {
                    _id: user._id,
                    email: user.email,
                    admin: user.admin
                };
            });
            res.json(docsReady);
        });
    },
    getUser: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            //console.log('looog-> ', doc)
            if (isAuth) {
                //console.log('isAuth-> ', isAuth.user._id, 'req.params.id-> ',  req.params.id)
                // the user has a proper token & is the same of the req.params.id: let's call next
                if (isAuth.user._id === req.params.id) {
                    // Send request to database
                    user_model_1.User.findById(toObjectId(req.params.id), function (err, doc) {
                        if (err)
                            return console.log(err);
                        res.json(doc);
                    });
                }
                else {
                    res.status(403).json({
                        message: 'Unauthorized access to this part of the API',
                        success: false
                    });
                }
            }
        });
    }
};
