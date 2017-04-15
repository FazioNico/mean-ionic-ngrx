/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   22-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 31-03-2017
*/

import * as mongoose from 'mongoose';
// Import Schemas
import { todoSchema } from './todo.schema';

export interface ITodoModel extends mongoose.Document {
  description: string;
  isComplete: boolean;
  deadline?: number;
  expire?: boolean;
}

// Define & export Mongoose Model with Interface
export const Todo = mongoose.model<ITodoModel>('todos', todoSchema);
