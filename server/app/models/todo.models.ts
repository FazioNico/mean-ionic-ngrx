/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 09-10-2017
*/

import * as mongoose from 'mongoose';

export const todoSchema:mongoose.Schema = new mongoose.Schema({
  description: { type: String, required: true  },
  isComplete: {
    type: Boolean,
    default: false
  },
  deadline: { type: Number, default: Date.now() },
  expire: { type: Boolean, default: false },
  user_id: { type: String, required: true  }
});
todoSchema.pre('save', (next)=> {
	next();
});

export interface ITodoModel extends mongoose.Document {
  description: string;
  isComplete: boolean;
  user_id:string;
  deadline?: number;
  expire?: boolean;
}

// Define & export Mongoose Model with Interface
export const Todo:mongoose.Model<ITodoModel> = mongoose.model<ITodoModel>('todos', todoSchema);
