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
const R = require("ramda");
const Code = require("../util/code");
const authentication_1 = require("../util/authentication");
function users(root, params, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(typeof (ctx), "==================");
        const repository = ctx.db.getRepository(user_1.User);
        const users = yield repository.find();
        console.log(users, "?????????");
        return users;
        // return R.compose(R.pick(["id","username"]))(users)
    });
}
exports.users = users;
function jwt(_obj, {}, { db, jwt }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield authentication_1.ensureUser(db, jwt);
        console.log(user);
        return R.compose(R.merge({ jwt: jwt }), R.pick(["id", "username"]))(user);
    });
}
exports.jwt = jwt;
function code(_obj, { id }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        let a = {
            code: Number,
            id: String
        };
        Code.storeCode(id);
        a.code = Code.getCode(id);
        a.id = id;
        return a;
    });
}
exports.code = code;
//# sourceMappingURL=query.js.map