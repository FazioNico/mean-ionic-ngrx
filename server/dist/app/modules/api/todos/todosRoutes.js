/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 24-12-2016
*/
"use strict";
exports.__esModule = true;
var express = require("express");
var todos_controller_1 = require("../../mongodb/todos/todos.controller");
var log_1 = require("../../log");
var router = express.Router();
var TodosRoutes = (function () {
    function TodosRoutes() {
        this._TodosController = todos_controller_1.todoController;
    }
    TodosRoutes.prototype.routes = function () {
        var controller = this._TodosController;
        router.get('/todos', log_1.log, controller.getItems);
        router.get('/todos/:id', log_1.log, controller.getItem);
        router.post('/todos', log_1.log, controller.addItem);
        router.put('/todos/:id', log_1.log, controller.updateItem);
        router["delete"]('/todos/:id', log_1.log, controller.deleteItem);
        return router;
    };
    return TodosRoutes;
}());
exports.TodosRoutes = TodosRoutes;
