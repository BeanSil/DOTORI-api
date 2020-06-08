import { Context, Next } from 'koa';

import * as redis from 'redis';

import { user } from '../models';
import { AnonymousUser, User } from '../modules/User';

const client = redis.createClient({
  host: process.env.REDIS_HOST
});

const sessionCreator = async (ctx: Context, next: Next) => {
  if (ctx.request.headers.authorization) {
    client.get(ctx.request.headers.authorization, async (err, pid) => {
      // redis 4 나오면 await으로 변경
      if (err) ctx.throw(500);
      ctx.user = pid ? new User(await user.findByPk(pid)) : AnonymousUser;
      await next();
    });
  } else {
    ctx.user = AnonymousUser;
    await next();
  }
};

export default sessionCreator;
