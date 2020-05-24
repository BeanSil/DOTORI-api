import { Context } from 'koa';

import * as crypto from 'crypto';

import * as redis from 'redis';
import * as uuid from 'uuid';
import * as Joi from '@hapi/joi';
import { user } from '../models';

const client = redis.createClient();
const hash = crypto.createHash('sha512');

export const getUserBySession = (ctx: Context) => {
  delete ctx.user.pid;
  delete ctx.user.pw;
  ctx.body = { data: ctx.user };
};

export const createSession = async (ctx: Context) => {
  const loginData = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required()
  });

  ctx.assert(!loginData.validate(ctx.body).error, 400);

  const data = ctx.body;
  hash.update(data.password);
  data.password = hash.digest('hex');

  const result = await user.findOne({ where: data, attributes: ['pid'] });

  ctx.assert(result, 400);

  const session = uuid.v4();

  if (!(await client.set(session, result.pid.toString()))) {
    ctx.throw(500);
  }

  ctx.body = { data: session };
};

export const deleteSession = (ctx: Context) => {

};

export const createUser = (ctx: Context) => {

}

export const modifyUser = (ctx: Context) => {

}

export const deleteUser = (ctx: Context) => {

}
