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
const Koa = require("koa");
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const routes_1 = require("./routes");
const bootstrap = () => __awaiter(this, void 0, void 0, function* () {
    const app = new Koa();
    app.use(bodyParser());
    app
        .use(routes_1.routes.routes())
        .use(routes_1.routes.allowedMethods())
        .listen(3000);
});
bootstrap();
//# sourceMappingURL=server.js.map