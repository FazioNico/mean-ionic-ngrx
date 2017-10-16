/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 10-10-2017
*/

import * as mongoose from 'mongoose'
import { Todo, ITodoModel } from "../../models/todo.models";
import { Authentication } from '../../authentication';

export const TodoResolver = {

  // this will find all the records in database and return it
  index(req):Promise<ITodoModel[]>{
    return Authentication.checkAuthentication(req)
    .then(doc => {
      //console.log('doc->', doc)
      // check if token exist
      if(!doc){
        // return Promise.reject('user not have authorization to access.')
        throw (new Error('user not have authorization to access.'))
      }
      return doc;
    })
    .then(user=> {
      return Todo.find({ user_id : user._id.toString() })
      .sort('deadline')
      .exec()
      .then( (records:ITodoModel[]) => {
        return records;
      })
      .catch( error => {
        return error;
      });
    })
    .catch( error => {
      return error;
    });
  },

  // this will find a single item based on id and return it.
  single( req, options ):Promise<ITodoModel> {
    return Authentication.checkAuthentication(req)
    .then(doc => {
      //console.log('doc->', doc)
      // check if token exist
      if(!doc){
        // return Promise.reject('user not have authorization to access.')
        throw (new Error('user not have authorization to access.'))
      }
      return doc;
    })
    .then(_=>{
      return Todo.findOne({ _id: (options.id||options._id) })
      .exec()
      .then( (item:ITodoModel) => {
        return item;
      })
    })
    .catch( error => {
      return error;
    });
  },

  // this will insert a new item in database
  create(req, data):Promise<ITodoModel> {
    return Authentication.checkAuthentication(req)
    .then(doc => {
      //console.log('doc->', doc)
      // check if token exist
      if(!doc){
        // return Promise.reject('user not have authorization to access.')
        throw (new Error('user not have authorization to access.'))
      }
      return doc;
    })
    .then(user=> {
      let newTodo = data
      newTodo.user_id = user._id;
      const newitem:ITodoModel = new Todo(newTodo);
      console.log('###########')
      console.log('new todo-> ', newitem)
      return newitem.save()
      .then( (result:ITodoModel) => {
        console.log('result save->', result)
        return result;
      })
    })
    .catch( (error) => {
      return error;
    });
  },

  // this will update existing record in database
  update(data):Promise<ITodoModel> {
    return Todo.findOne({ _id: (data.id || data._id) })
    .exec()
    .then( (item) => {
      Object.keys(data).map( field => {
        item[field] = data[field];
      });

      return item.save()
      .then( (updated:ITodoModel) => {
        return updated;
      })
      .catch( (error) => {
        return error;
      });

    })
    .catch( (error) => {
      return error;
    });
  },

  // this will remove the record from database.
  delete( options ):Promise<{status:boolean}> {
    return Todo.findById( (options._id  || options.id))
    .exec()
    .then( (item:ITodoModel) => {
      item.remove();
      return { status: true, _id: (options._id  || options.id)};
    })
    .catch( error => {
      return error;
    });
  }

};
