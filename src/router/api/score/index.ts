import * as Router from 'koa-router';
import { sequelize } from '../../../models';

const score = new Router();

score.get('/', (ctx, next) => {
    //TO-DO: 토큰 검증 미들웨어 추가
    //TO-DO: MariaDB 연동 및 쿼리 로직 추가

    let result = sequelize.sync();

    ctx.body = result;
});

score.get('/archive', (ctx, next) => {
    ctx.body = 'GET /score/archive';
});

score.post('/archive', (ctx, next) => {
    ctx.body = 'POST /score/archive';
});

score.put('/archive', (ctx, next) => {
    ctx.body = 'PUT /score/archive';
});

score.delete('/archive', (ctx, next) => {
    ctx.body = 'DELETE /score/archive';
});

export default score;