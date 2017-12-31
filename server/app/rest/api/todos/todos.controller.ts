/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 31-12-2017
*/

import * as mongoose from 'mongoose';
import { Todo, ITodoModel } from '../../../models/todo.models';
import { Authentication } from '../../../authentication';
import { responseNormalizer } from "../../../config";

const toObjectId = (_id: string): mongoose.Types.ObjectId =>{
    return mongoose.Types.ObjectId.createFromHexString(_id);
}

export const todoController = {
	getItems : (req,res) => {
    Authentication.checkAuthentication(req)
    .then(isAuth=>{
      if(isAuth){
        let _uid = isAuth._id
    		Todo
          .find({ user_id : _uid.toString() })
          .exec((err, docs:ITodoModel[]) => {
      			if(err) return console.log(err);
      			res.json(responseNormalizer(200,{todos:docs}));
      		})
      }
      else {
        res.status(403).json(responseNormalizer(403,{error:'Error getTodos: UnAuthorized access.'}));
      }
    })
    .catch(
      err => res.status(400).json(responseNormalizer(400,{error:'Error getTodos: UnAuthorized access.'}))
    )
	},
	getItem : (req,res) => {
		Todo.findById(toObjectId(req.params.id), (err, doc:ITodoModel) => {
			if(err) return res.status(404).json(responseNormalizer(404, {error:err}, 'Error getTodo by ID: cannot find todo with ID: '+req.params.id+''));
			res.json(responseNormalizer(200,{todo:doc}));
		})
	},
	deleteItem : (req,res) => {
		Todo.findByIdAndRemove(toObjectId(req.params.id),  (err, doc:ITodoModel) => {
			if(err) return res.status(404).json(responseNormalizer(404, {error:err}, 'Error deleteTodo by ID: cannot delete todo with ID: '+req.params.id+''));
			res.json(responseNormalizer(200,{todo:doc}));
		})
	},
	addItem : (req,res) =>{
    Authentication.checkAuthentication(req)
    .then(isAuth=> {
      if(isAuth){
        let _uid = isAuth._id
        let newTodo = req.body
        newTodo.user_id = _uid;
    		(new Todo(<ITodoModel>newTodo)).save((err, doc:ITodoModel) => {
    			if(err) return console.log(err);
    			res.json(responseNormalizer(200,{todo:doc}));
    		})
      }
      else {
        console.log('error add item');
        return res.status(403).json(responseNormalizer(403,null, 'Error addTodos: UnAuthorized access.'))
      }
    })
	},
	updateItem : (req,res) => {
		let updateTodo = <ITodoModel>req.body;
		delete updateTodo._id;
		Todo.update({_id: toObjectId(req.params.id)}, updateTodo, (err, doc:ITodoModel)=>{
			if(err) {
        console.log(err)
        return res.status(404).json(responseNormalizer(404,null, 'Error updateTodo by ID: cannot find todo.'))
      };
      updateTodo._id = req.params.id;
      res.json(responseNormalizer(200,{todo:updateTodo}))
		})
	},
}
