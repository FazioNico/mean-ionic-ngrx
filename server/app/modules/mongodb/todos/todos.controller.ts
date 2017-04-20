/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
*/

import * as mongoose from 'mongoose';
import { Todo, ITodoModel } from './todo.model';

import {Authentication} from '../../authentication';

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const todoController = {
	getItems : (req,res) => {
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      if(isAuth){
        let _uid = isAuth.user._id
    		Todo
          .find({ user_id : _uid.toString() })
          .exec((err, docs:ITodoModel[]) => {
      			if(err) return console.log(err);
      			res.json(docs);
      		})
      }
      else {
        res.json([]);
      }
    })
	},
	getItem : (req,res) => {
		Todo.findById(toObjectId(req.params.id), (err, doc:ITodoModel) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	deleteItem : (req,res) => {
		Todo.findByIdAndRemove(toObjectId(req.params.id),  (err, doc:ITodoModel) => {
			if(err) return console.log(err);
			res.json(doc);
		})
	},
	addItem : (req,res) =>{
    Authentication.checkAuthentication(req,  (isAuth: boolean|any): void =>{
      if(isAuth){
        let _uid = isAuth.user._id
        let newTodo = req.body
        newTodo.user_id = _uid;
    		(new Todo(<ITodoModel>newTodo)).save((err, doc:ITodoModel) => {
    			if(err) return console.log(err);
    			res.json(doc);
    		})
      }
      else {
        return console.log('error add item');
      }
    })
	},
	updateItem : (req,res) => {
		let updateTodo = <ITodoModel>req.body;
		delete updateTodo._id;
		Todo.update({_id: toObjectId(req.params.id)}, updateTodo, (err, doc:ITodoModel)=>{
			if(err) return console.log(err);

      updateTodo._id = req.params.id;
      let response = {
        result:true,
        response: updateTodo
      };
			res.json(response);
		})
	},

}
