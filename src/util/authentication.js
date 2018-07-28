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
const jsonwebtoken_1 = require("jsonwebtoken");
const config = require("../../config");
const errors_1 = require("./errors");
const user_1 = require("../entities/user");
function extractJwt(jwt) {
    const parts = (jwt || "").split(" ");
    if (parts.length !== 2) {
        return null;
    }
    try {
        return jsonwebtoken_1.verify(parts[1], config.JWT_SECRET);
    }
    catch (err) {
        return null;
    }
}
function fetchUser(db, jwt) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwtObject = extractJwt(jwt);
        if (!(jwtObject && typeof jwtObject === "object" && jwtObject.id)) {
            return null;
        }
        const repository = db.getRepository(user_1.User);
        return yield repository.findOne({ id: jwtObject.id });
    });
}
exports.fetchUser = fetchUser;
function ensureUser(db, jwt) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield fetchUser(db, jwt);
        if (!user) {
            throw errors_1.validationError({
                jwt: ["请先登录!"]
            });
        }
        return user;
    });
}
exports.ensureUser = ensureUser;
//# sourceMappingURL=authentication.js.map