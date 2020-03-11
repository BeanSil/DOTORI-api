import { Context, Next } from 'koa';

const sessionCreator = async function (ctx: Context, next: Next) {
    // TODO: User 모델 만들어서 그거 줄 것
    ctx.user = {
        id: 1,
        name: 'Anonymous'
    };
    
    //TO-DO: 토큰으로부터 추출한 User 데이터가 없을 경우 에러 Throw
    ctx.assert(ctx.user, 401, 'Can\'t find any users in current token. Please refresh your token and try again.');
    
    return await next();
};

export default sessionCreator