/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   24-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 27-03-2017
*/
"use strict";
exports.__esModule = true;
var express = require("express");
var todosRoutes_1 = require("../api/todos/todosRoutes");
var users_routes_1 = require("../api/users/users.routes");
var app = express();
var APIRoutes = (function () {
    function APIRoutes() {
    }
    APIRoutes.prototype.routes = function () {
        app.use("/", new todosRoutes_1.TodosRoutes().routes());
        app.use("/", new users_routes_1.UsersRoutes().routes());
        return app;
    };
    return APIRoutes;
}());
exports.APIRoutes = APIRoutes;
