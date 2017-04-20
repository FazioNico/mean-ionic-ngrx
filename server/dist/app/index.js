/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   21-12-2016
* @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 28-03-2017
*/
"use strict";
exports.__esModule = true;
/// <reference path="./@types/index.d.ts" />
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var morgan = require("morgan");
var serverRoute_1 = require("./modules/routes/serverRoute");
var apiRoute_1 = require("./modules/routes/apiRoute");
var database_1 = require("./modules/database");
// Import secretTokenKey config
var config_1 = require("./config");
var Server = (function () {
    function Server() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.config();
        this.middleware();
        this.dbConnect();
    }
    Server.prototype.config = function () {
        // define the app.server endpoints folder
        this.root = path.join(__dirname, '../api');
        // define prot & normalize value
        this.port = this.normalizePort(process.env.PORT || 8080);
        // use the root path defined
        this.app.use(express.static(this.root));
    };
    Server.prototype.middleware = function () {
        this.app
            .use(bodyParser.json())
            .use(bodyParser.json({ type: 'application/vnd.api+json' }))
            .use(bodyParser.urlencoded({ extended: false }))
            .set('superSecret', config_1.SECRET_TOKEN_KEY)
            .use(morgan('dev'))
            .use(cors());
    };
    Server.prototype.dbConnect = function () {
        var _this = this;
        // Load DB connection
        database_1.DataBase.connect()
            .then(function (result) {
            // Load all route
            console.log(result);
            // Server Endpoints
            _this.app.use(new serverRoute_1.ServerRoutes().routes());
            // REST API Endpoints
            _this.app.use(new apiRoute_1.APIRoutes().routes());
        })["catch"](function (error) {
            // DB connection Error => load only server route
            console.log(error);
            // Server Endpoints
            _this.app.use(new serverRoute_1.ServerRoutes().routes());
            return error;
        })
            .then(function (error) {
            // Then catch 404 & db error connection
            _this.app.use(function (req, res) {
                console.log(error);
                var message = (error) ? [{ error: 'Page not found' }, { error: error }] : [{ error: 'Page not found' }];
                res.status(404).json(message);
            });
        });
    };
    Server.prototype.onError = function (error) {
        if (error.syscall !== 'listen')
            throw error;
        var bind = (typeof this.port === 'string') ? 'Pipe ' + this.port : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    };
    Server.prototype.normalizePort = function (val) {
        var port = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    };
    Server.prototype.bootstrap = function () {
        var _this = this;
        this.server.on('error', this.onError);
        this.server.listen(this.port, function () {
            console.log("Listnening on port " + _this.port);
        });
    };
    return Server;
}());
exports.Server = Server;
