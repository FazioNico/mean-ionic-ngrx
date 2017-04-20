/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   25-12-2016
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 25-12-2016
*/
"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
// Import secretTokenKey config
var config_1 = require("../config");
// export the authentication class:
var Authentication = (function () {
    function Authentication() {
    }
    Authentication.checkAuthentication = function (req, cb) {
        // look for the token in the incoming request:
        var token = req.body.token || req.query.token ||
            req.get('x-access-token') || req.get('authentication') || undefined;
        if (token === undefined) {
            // there is no token!
            cb(false);
        }
        else {
            jsonwebtoken_1.verify(token, config_1.SECRET_TOKEN_KEY, function (err, decoded) {
                if (err) {
                    cb(false);
                }
                else {
                    //console.log('req.decoded-> ', decoded._doc._id )
                    req.decoded = decoded;
                    cb({ success: true, user: decoded._doc });
                }
            });
        }
    };
    Authentication.authenticatedRoute = function (req, res, next) {
        Authentication.checkAuthentication(req, function (isAuth) {
            if (isAuth) {
                // the user has a proper token: let's call next
                //console.log('isAuth-> ', isAuth )
                next();
            }
            else {
                console.log('unauthorized access! kicking the client out with 403');
                res.status(403).json({
                    message: 'Error: You need to authenticate to access this part of the API',
                    success: false
                });
            }
        });
    };
    return Authentication;
}());
exports.Authentication = Authentication;
