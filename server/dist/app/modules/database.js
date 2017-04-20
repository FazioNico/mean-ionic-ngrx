"use strict";
exports.__esModule = true;
var mongo_1 = require("./mongodb/mongo");
var DataBase = (function () {
    function DataBase() {
    }
    DataBase.connect = function () {
        // connect to database
        return new Promise(function (resolve, reject) {
            mongo_1.mongoDbConnect()
                .then(function (response) {
                resolve(response);
            })["catch"](function (err) {
                reject(err);
            });
        });
    };
    return DataBase;
}());
exports.DataBase = DataBase;
