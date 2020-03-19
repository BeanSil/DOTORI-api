import { Context, Next } from 'koa';

const sessionCreator = async (ctx: Context, next: Next) => {
  ctx.user = '1'; // TODO: User 모델 만들어서 그거 줄 것
  await next();
};

export default sessionCreator;
