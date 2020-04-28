import { Context, Next } from 'koa';
import { NeedAuthority, NotLoggedIn } from './error';

export const LoginRequired = async (ctx: Context, next: Next) => {
  if (!ctx.user.pid) throw new NotLoggedIn();
  await next();
};

export const AdminOnly = async (ctx: Context, next: Next) => {
  // TODO: admin 검사
  if (ctx.user.authority !== '관리자') throw new NeedAuthority();
  await next();
};
