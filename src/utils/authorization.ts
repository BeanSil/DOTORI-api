import { Context, Next } from 'koa';
import { NeedAuthority, NotLoggedIn } from './error';
import { AuthorityUtil } from "../modules/User";

export const MustNotLoggedIn = async (ctx: Context, next: Next) => {
  if (ctx.user.pid) throw new NeedAuthority();
  await next();
}

export const LoginRequired = async (ctx: Context, next: Next) => {
  if (!ctx.user.pid) throw new NotLoggedIn();
  await next();
};

export const AdminOnly = async (ctx: Context, next: Next) => {
  // TODO: admin 검사
  if (AuthorityUtil.isAdmin(ctx.user.authority)) throw new NeedAuthority();
  await next();
};
