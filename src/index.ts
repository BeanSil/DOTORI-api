// import Koa.js related package
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';

import router from './router';

const app = new Koa();

// setting port
const port = process.env.PORT || 5000;

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
