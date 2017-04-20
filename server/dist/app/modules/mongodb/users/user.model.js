/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/
"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
// Import Schemas
var user_schema_1 = require("./user.schema");
// Define & export Mongoose Model with Interface
exports.User = mongoose.model('users', user_schema_1.UserSchema);
