import * as Koa from 'koa'
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

import { routes } from './routes';



const bootstrap = async () => {
    const app = new Koa()
    app.use(bodyParser());
    app
        .use(routes.routes())
        .use(routes.allowedMethods())
        .listen(3000)

}

bootstrap()