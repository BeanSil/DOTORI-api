import { Context } from 'koa';
import { music } from '../models';
import * as Joi from '@hapi/joi';

export const applyMusic = async (ctx: Context) => {
  const getdata = ctx.request.body;

  const data = {
    data:{
      applyMusic: await music.create(getdata)
    }
  };

  ctx.status = 201;

  ctx.body = data;
};

export const checkmusic = async (ctx: Context) => {
  const requestSchema = Joi.object({
    data: {
      // status : 0: 요청 완료, 1:음악 승인, 2:음악 거절
      status: Joi.number()
        .integer()
        .required()
    },
    conditions: {
      id: Joi.number()
        .integer()
        .required()
    }
  }).with('data', 'conditions');

  const requested = await requestSchema.validateAsync(ctx.request.body);

  const provided = requested.data;
  const conditions = requested.conditions;

  await music.update(provided, {
    where: conditions
  });

  ctx.status = 202;
};

export const getMusic = async (ctx: Context) => {
  const getdata = await music.findAll();

  const data = {
    data:{
      list: getdata
    }
  };

  ctx.status = 200;

  ctx.body = data;
};

export const deleteMusic = async (ctx: Context) => {
  const requestSchema = Joi.object({
    id: Joi.number()
      .integer()
      .required()
  });

  const conditions = await requestSchema.validateAsync(ctx.request.body);

  await music.destroy({
    where: conditions
  });

  ctx.status = 204;
};
