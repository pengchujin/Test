"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let code = new Map();
exports.deleteCode = function (key) {
    code.delete(key);
};
exports.storeCode = function (key) {
    let a = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    code.set(key, a);
    setTimeout(exports.deleteCode, 60000, key);
};
exports.getCode = function (key) {
    let a = code.get(key);
    return a;
};
//# sourceMappingURL=code.js.map