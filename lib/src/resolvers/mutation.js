"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../entities/user");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const config = require("../../config");
const Code = require("../util/code");
const errors_1 = require("../util/errors");
// import * as R from "ramda"
function signup(_obj, { username, password, code }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        let Message = {
            TF: false,
            Message: "something wrong"
        };
        if (code == Code.getCode(username)) {
            const repository = db.getRepository(user_1.User);
            const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
            let b = {
                encryptedPassword: hash,
                username: username
            };
            yield repository.save(b);
            const userSaved = yield repository.findOne({ username: username });
            let TF = bcrypt.compareSync(password, userSaved.encryptedPassword);
            Message.TF = TF;
            Message.Message = "OK";
        }
        else {
            Message.Message = "Wrong Code";
        }
        return Message;
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
function signin(_obj, { username, password }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        let a = { jwt: String, id: Number, username: String };
        const repository = db.getRepository(user_1.User);
        const userSaved = yield repository.findOne({ username: username });
        let TF = authenticate(userSaved, password);
        if (TF) {
            let userToken = {
                username: username,
                id: userSaved.id
            };
            const jwt = Jwt.sign(userToken, config.JWT_SECRET, { expiresIn: '1h' });
            a.jwt = jwt;
            a.username = username;
            a.id = userSaved.id;
        }
        else {
            throw errors_1.validationError({
                LoginError: ["用户名,或者密码错误"]
            });
        }
        return a;
    });
}
exports.signin = signin;
function cPassword(_obj, { username, oPassword, nPassword }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        let Result = false;
        let Message = '修改失败';
        const repository = db.getRepository(user_1.User);
        const userModel = yield repository.findOne({ username: username });
        console.log(userModel);
        console.log(oPassword, nPassword);
        const TF = bcrypt.compareSync(oPassword, userModel.encryptedPassword);
        console.log(userModel.encryptedPassword);
        console.log('===================TF: ', TF);
        if (TF) {
            Message = '修改成功';
            Result = true;
            const hash = bcrypt.hashSync(nPassword, config.SALT_ROUNDS);
            yield repository.update({ username: username }, { encryptedPassword: hash });
        }
        const Res = {
            TF: Result,
            Message: Message
        };
        return Res;
    });
}
exports.cPassword = cPassword;
function dUser(_obj, { username }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        let Result = false;
        let Message = '修改失败';
        const repository = db.getRepository(user_1.User);
        const model = yield repository.findOne({ username: username });
        console.log(model);
        if (model) {
            Result = true;
            Message = '删除成功';
            yield repository.remove(model);
        }
        const Res = {
            TF: Result,
            Message: Message
        };
        return Res;
    });
}
exports.dUser = dUser;
//# sourceMappingURL=mutation.js.map