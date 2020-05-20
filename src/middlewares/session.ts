import { Context, Next } from 'koa';
import { user } from '../models';
import { AnonymousUser, User } from '../modules/User';

const sessionCreator = async (ctx: Context, next: Next) => {
  const auth = ctx.request.headers.authorization || -1;
  ctx.user = new User(await user.findByPk(auth)) || AnonymousUser;
  await next();
};

export default sessionCreator;
