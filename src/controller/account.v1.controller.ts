import { Context } from 'koa';
import * as Joi from '@hapi/joi';

export const getUserBySession = (ctx: Context) => {
  ctx.body = ctx.user
};