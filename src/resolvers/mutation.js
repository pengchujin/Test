"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var user_1 = require("../entities/user");
var bcrypt = require("bcrypt");
var Jwt = require("jsonwebtoken");
var config = require("../../config");
var Code = require("../util/code");
var errors_1 = require("../util/errors");
// import * as R from "ramda"
function signup(_obj, _a, _b) {
    var username = _a.username, password = _a.password, code = _a.code;
    var db = _b.db;
    return __awaiter(this, void 0, void 0, function () {
        var Message, repository, hash, b, userSaved, TF;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Message = {
                        TF: false,
                        Message: "something wrong"
                    };
                    if (!(code == Code.getCode(username))) return [3 /*break*/, 3];
                    repository = db.getRepository(user_1.User);
                    hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
                    b = {
                        encryptedPassword: hash,
                        username: username
                    };
                    return [4 /*yield*/, repository.save(b)];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, repository.findOne({ username: username })];
                case 2:
                    userSaved = _c.sent();
                    TF = bcrypt.compareSync(password, userSaved.encryptedPassword);
                    Message.TF = TF;
                    Message.Message = "OK";
                    return [3 /*break*/, 4];
                case 3:
                    Message.Message = "Wrong Code";
                    _c.label = 4;
                case 4: return [2 /*return*/, Message];
            }
        });
    });
}
exports.signup = signup;
function authenticate(user, password) {
    if (!user) {
        return false;
    }
    else {
        return bcrypt.compareSync(password, user.encryptedPassword);
    }
}
function signin(_obj, _a, _b) {
    var username = _a.username, password = _a.password;
    var db = _b.db;
    return __awaiter(this, void 0, void 0, function () {
        var a, repository, userSaved, TF, userToken, jwt;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = { jwt: String, id: Number, username: String };
                    repository = db.getRepository(user_1.User);
                    return [4 /*yield*/, repository.findOne({ username: username })];
                case 1:
                    userSaved = _c.sent();
                    TF = authenticate(userSaved, password);
                    if (TF) {
                        userToken = {
                            username: username,
                            id: userSaved.id
                        };
                        jwt = Jwt.sign(userToken, config.JWT_SECRET, { expiresIn: '1h' });
                        a.jwt = jwt;
                        a.username = username;
                        a.id = userSaved.id;
                    }
                    else {
                        throw errors_1.validationError({
                            LoginError: ["用户名,或者密码错误"]
                        });
                    }
                    return [2 /*return*/, a];
            }
        });
    });
}
exports.signin = signin;
function cPassword(_obj, _a, _b) {
    var username = _a.username, oPassword = _a.oPassword, nPassword = _a.nPassword;
    var db = _b.db;
    return __awaiter(this, void 0, void 0, function () {
        var Result, Message, repository, userModel, TF, hash, Res;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Result = false;
                    Message = '修改失败';
                    repository = db.getRepository(user_1.User);
                    return [4 /*yield*/, repository.findOne({ username: username })];
                case 1:
                    userModel = _c.sent();
                    console.log(userModel);
                    console.log(oPassword, nPassword);
                    TF = bcrypt.compareSync(oPassword, userModel.encryptedPassword);
                    console.log(userModel.encryptedPassword);
                    console.log('===================TF: ', TF);
                    if (!TF) return [3 /*break*/, 3];
                    Message = '修改成功';
                    Result = true;
                    hash = bcrypt.hashSync(nPassword, config.SALT_ROUNDS);
                    return [4 /*yield*/, repository.update({ username: username }, { encryptedPassword: hash })];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    Res = {
                        TF: Result,
                        Message: Message
                    };
                    return [2 /*return*/, Res];
            }
        });
    });
}
exports.cPassword = cPassword;
function dUser(_obj, _a, _b) {
    var username = _a.username;
    var db = _b.db;
    return __awaiter(this, void 0, void 0, function () {
        var Result, Message, repository, model, Res;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    Result = false;
                    Message = '修改失败';
                    repository = db.getRepository(user_1.User);
                    return [4 /*yield*/, repository.findOne({ username: username })];
                case 1:
                    model = _c.sent();
                    console.log(model);
                    if (!model) return [3 /*break*/, 3];
                    Result = true;
                    Message = '删除成功';
                    return [4 /*yield*/, repository.remove(model)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    Res = {
                        TF: Result,
                        Message: Message
                    };
                    return [2 /*return*/, Res];
            }
        });
    });
}
exports.dUser = dUser;
