import {Context} from "koa";

const sessionCreator = async (ctx: Context, next: () => Promise<any>) => {
    ctx.user = '1';  // TODO: User 모델 만들어서 그거 줄 것
    return await next()
};

export default sessionCreator