/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/
"use strict";
exports.__esModule = true;
var express = require("express");
var users_controller_1 = require("../../mongodb/users/users.controller");
var log_1 = require("../../log");
var authentication_1 = require("../../authentication");
var router = express.Router();
var UsersRoutes = (function () {
    function UsersRoutes() {
        this._UsersController = users_controller_1.userController;
    }
    UsersRoutes.prototype.routes = function () {
        var controller = this._UsersController;
        // Public Endpoints:
        router.get('/setup', log_1.log, controller.setup);
        router.post('/auth', log_1.log, controller.auth);
        router.get('/isauth', log_1.log, controller.isAuth);
        router.post('/signup', log_1.log, controller.signup);
        // Use middleware to set private Endpoints:
        router.use(authentication_1.Authentication.authenticatedRoute);
        // Privates Endpoints
        router.get('/users', log_1.log, controller.getAll);
        router.get('/users/:id', log_1.log, controller.getUser);
        // then return the user router
        return router;
    };
    return UsersRoutes;
}());
exports.UsersRoutes = UsersRoutes;
