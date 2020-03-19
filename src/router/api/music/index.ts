import * as Router from 'koa-router';
import { sequelize } from '../../../models';

const music = new Router();


music.get('/v1', (ctx, next) => {
    ctx.body = 'GET /music/v1';
});

music.post('/v1', (ctx, next) => {
    ctx.body = 'POST /music/v1';
});

music.delete('/v1/:id', (ctx, next) => {
    ctx.body = 'DELETE /music/v1/:id';
});

export default music; 