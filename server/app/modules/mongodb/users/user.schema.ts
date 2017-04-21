/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  password: {
      type: String,
      required: true,
      match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
      minlength: 6
  },
  email: {
      type: String,
      require: true,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  },
  admin: Boolean,
  created: {
     type: Date,
     required: true,
     default: new Date()
  }
});
