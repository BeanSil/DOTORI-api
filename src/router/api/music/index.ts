import * as Router from 'koa-router';
import { sequelize } from '../../../models';

const music = new Router();


music.get('/music', (ctx, next) => {
    ctx.body = 'GET /music/v1';
});

music.post('/music', (ctx, next) => {
    ctx.body = 'POST /music/v1';
});

music.delete('/music/:id', (ctx, next) => {
    ctx.body = 'DELETE /music/v1/:id';
});

export default music; 