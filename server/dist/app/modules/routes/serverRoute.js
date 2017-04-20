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
var log_1 = require("../log");
var app = express();
var ServerRoutes = (function () {
    function ServerRoutes() {
    }
    ServerRoutes.prototype.routes = function () {
        // Index Server
        app.get('/', log_1.log, function (req, res) {
            res.status(200);
            res.json([{ api: 'Hello!' }]);
        });
        return app;
    };
    return ServerRoutes;
}());
exports.ServerRoutes = ServerRoutes;
