"use strict";
exports.__esModule = true;
var code = new Map();
exports.deleteCode = function (key) {
    code["delete"](key);
};
exports.storeCode = function (key) {
    var a = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    code.set(key, a);
    setTimeout(exports.deleteCode, 60000, key);
};
exports.getCode = function (key) {
    var a = code.get(key);
    return a;
};
