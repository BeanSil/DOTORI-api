import { Context } from 'koa';

import * as crypto from 'crypto';

import * as redis from 'redis';
import * as uuid from 'uuid';
import * as Joi from '@hapi/joi';
import { user } from '../models';
import { User } from '../modules/User';

const client = redis.createClient({
  host: process.env.REDIS_HOST
});

export const getUserBySession = (ctx: Context) => {
  delete ctx.user.pw;
  ctx.body = { data: ctx.user };
};

export const createSession = async (ctx: Context) => {
  const loginData = Joi.object({
    email: Joi.string().required(),
    pw: Joi.string().required()
  });

  ctx.assert(!loginData.validate(ctx.request.body).error, 400);

  const data = ctx.request.body;
  const hash = crypto.createHash('sha512');
  hash.update(data.pw);
  data.pw = hash.digest('hex');

  const result = await user.findOne({ where: data, attributes: ['pid'] });

  ctx.assert(!result, 400);

  const session = uuid.v4();

  if (!(await client.set(session, result.pid.toString()))) {
    ctx.throw(500);
  }

  ctx.body = { data: session };
};

export const deleteSession = (ctx: Context) => {
  client.del(ctx.request.headers.authorization, err => {
    if (err) ctx.throw(500);
    else ctx.status = 200;
  });
};

export const createUser = async (ctx: Context) => {
  const userData = Joi.object({
    email: Joi.string().required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
    grade: Joi.number().required(),
    class: Joi.number().required(),
    number: Joi.number().required(),
    phone: Joi.string().required()
  });

  ctx.assert(!userData.validate(ctx.request.body).error, 400);

  const data = ctx.request.body;

  const hash = crypto.createHash('sha512');
  hash.update(data.pw);
  data.pw = hash.digest('hex');

  const created = new User(await user.create(data));

  delete created.pw;

  ctx.status = 201;

  ctx.body = {
    data: created
  };
};

export const modifyUser = async (ctx: Context) => {
  const userData = Joi.object({
    original_pw: Joi.string().required(),
    new_pw: Joi.string(),
    name: Joi.string()
  });

  ctx.assert(!userData.validate(ctx.request.body).error, 400);

  const data = ctx.request.body;

  let hash = crypto.createHash('sha512');
  hash.update(data.new_pw);
  data.pw = hash.digest('hex');

  hash = crypto.createHash('sha512');
  hash.update(data.original_pw);
  const originalHash = hash.digest('hex');

  const foundUser = await user.findOne({
    where: {
      pid: ctx.user.pid,
      pw: originalHash
    }
  });

  await foundUser.update(data);

  const updated = new User(foundUser);
  delete updated.pw;

  ctx.body = {
    data: updated
  };
};

export const deleteUser = async (ctx: Context) => {
  const deleted = await user.destroy({ where: { pid: ctx.user.pid } });
  if (!deleted) ctx.throw(500);
  ctx.status = 200;
};
