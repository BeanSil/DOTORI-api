import * as Router from 'koa-router';
import {Context, Next} from "koa";

const v1 = new Router();

v1.get('/', (ctx: Context) => {
  ctx.body = 'GET /music/v1';
});

v1.post('/', (ctx: Context) => {
  ctx.body = 'POST /music/v1';
});

v1.delete('/:id', (ctx: Context) => {
  ctx.body = 'DELETE /music/v1/:id';
});

export default v1;