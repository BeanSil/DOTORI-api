import * as Router from 'koa-router';
import { sequelize } from '../../../models';

const music_apply = new Router();

music_apply.get('/', (ctx, next) => {
    //TO-DO: 토큰 검증 미들웨어 추가
    //TO-DO: MariaDB 연동 및 쿼리 로직 추가

    let result = sequelize.sync();

    ctx.body = result;
});

music_apply.get('/music', (ctx, next) => {
    ctx.body = 'GET /music_apply/music';
});

music_apply.post('/music', (ctx, next) => {
    ctx.body = 'POST /music_apply/music';
});

music_apply.delete('/music/:id', (ctx, next) => {
    ctx.body = 'DELETE /music_apply/music';
});

export default music_apply; 