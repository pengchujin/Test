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
const Router = require("koa-router");
const koaBody = require("koa-bodyparser");
const typeorm_1 = require("typeorm");
const apollo_server_koa_1 = require("apollo-server-koa");
const schema_1 = require("./schema");
exports.routes = new Router();
(() => __awaiter(this, void 0, void 0, function* () {
    const db = yield typeorm_1.createConnection();
    const apiEntrypointPath = '/graphql';
    const graphqlApi = (ctx, next) => apollo_server_koa_1.graphqlKoa({
        schema: schema_1.schema,
        context: {
            ctx,
            db,
            jwt: ctx.header.authorization
        }
    })(ctx, next);
    exports.routes.get(apiEntrypointPath, koaBody(), graphqlApi);
    exports.routes.post(apiEntrypointPath, koaBody(), graphqlApi);
    exports.routes.get('/graphiql', apollo_server_koa_1.graphiqlKoa({ endpointURL: apiEntrypointPath }));
}))();
//# sourceMappingURL=routes.js.map