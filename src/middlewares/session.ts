import {Context} from "koa";

const sessionCreator = async (ctx: Context, next: () => Promise<any>) => {
    ctx.user = '1';  // TODO: Authorization Header에 있는 Oauth Access Token 받아서 유저로 변환
    return await next()
};

export default sessionCreator;