/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 20-04-2017
*/
"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var todo_model_1 = require("./todo.model");
var authentication_1 = require("../../authentication");
var toObjectId = function (_id) {
    return mongoose.Types.ObjectId.createFromHexString(_id);
};
exports.todoController = {
    getItems: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            if (isAuth) {
                var _uid = isAuth.user._id;
                todo_model_1.Todo
                    .find({ user_id: _uid.toString() })
                    .exec(function (err, docs) {
                    if (err)
                        return console.log(err);
                    res.json(docs);
                });
            }
            else {
                res.json([]);
            }
        });
    },
    getItem: function (req, res) {
        todo_model_1.Todo.findById(toObjectId(req.params.id), function (err, doc) {
            if (err)
                return console.log(err);
            res.json(doc);
        });
    },
    deleteItem: function (req, res) {
        todo_model_1.Todo.findByIdAndRemove(toObjectId(req.params.id), function (err, doc) {
            if (err)
                return console.log(err);
            res.json(doc);
        });
    },
    addItem: function (req, res) {
        authentication_1.Authentication.checkAuthentication(req, function (isAuth) {
            if (isAuth) {
                var _uid = isAuth.user._id;
                var newTodo = req.body;
                newTodo.user_id = _uid;
                (new todo_model_1.Todo(newTodo)).save(function (err, doc) {
                    if (err)
                        return console.log(err);
                    res.json(doc);
                });
            }
            else {
                return console.log('error add item');
            }
        });
    },
    updateItem: function (req, res) {
        var updateTodo = req.body;
        delete updateTodo._id;
        todo_model_1.Todo.update({ _id: toObjectId(req.params.id) }, updateTodo, function (err, doc) {
            if (err)
                return console.log(err);
            updateTodo._id = req.params.id;
            var response = {
                result: true,
                response: updateTodo
            };
            res.json(response);
        });
    }
};
