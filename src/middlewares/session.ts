import { Context, Next } from 'koa';

const sessionCreator = async function (ctx: Context, next: Next) {
    // TODO: User 모델 만들어서 그거 줄 것
    ctx.user = {
        id: 1,
        name: 'Anonymous'
    };

    return await next();
};

export default sessionCreator;