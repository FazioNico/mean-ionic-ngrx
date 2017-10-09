/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-08-2017
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 19-08-2017
*/

import * as mongoose from 'mongoose'
import { Todo, ITodoModel } from "../../models/todo.models";

export const TodoResolver = {

  // this will find all the records in database and return it
  index():Promise<ITodoModel[]>{
    return Todo.find()
    .sort('deadline')
    .exec()
    .then( records => {
      return records;
    })
    .catch( error => {
      return error;
    });
  },

  // this will find a single item based on id and return it.
  single( options ):Promise<ITodoModel> {
    return Todo.findOne({ _id: (options.id||options._id) })
    .exec()
    .then( item => {
      return item;
    })
    .catch( error => {
      return error;
    });
  },

  // this will insert a new item in database
  create(data):Promise<ITodoModel> {
    const newitem = new Todo(data);
    console.log('###########')
    console.log('new todo-> ', data)
    return newitem.save()
    .then( (result) => {
      return result;
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
      .then( updated => {
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
    .then( item => {
      item.remove();
      return { status: true, _id: (options._id  || options.id)};
    })
    .catch( error => {
      return error;
    });
  }

};
