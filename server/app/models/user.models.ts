/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 17-08-2017
*/

import * as mongoose from 'mongoose';
import * as bcrypt from "bcryptjs";

const hash_password = ( password ) => {
	let salt = bcrypt.genSaltSync(); // enter number of rounds, default: 10
	let hash = bcrypt.hashSync( password, salt );
	return hash;
};

export const userSchema:mongoose.Schema = new mongoose.Schema({
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
  admin: {
     type: Boolean,
     required: false,
     default: false
  },
  created: {
     type: Date,
     required: true,
     default: new Date()
  }
});
userSchema.methods.comparePassword = (password)=> {
	if ( ! this.password ) {
		return false;
	}
	return bcrypt.compareSync( password, this.password );
};
userSchema.pre('save', (next)=> {
  // check if password is present and is modified.
	if ( this.password && this.isModified('password') ) {
		this.password = hash_password(this.password);
	}
	next();
});

export interface IUserModel extends mongoose.Document {
  password: string,
  email:string,
  admin: boolean
  created: Date,
}

// Define & export Mongoose Model with Interface
export const User:mongoose.Model<IUserModel> = mongoose.model<IUserModel>('users', userSchema);
