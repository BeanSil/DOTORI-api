import { Context } from 'koa';
import { music } from '../models';
import * as Joi from '@hapi/joi';

const requestSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .required()
});

export const applyMusic = async (ctx: Context) => {
  const apply = Joi.object().keys({
    user_id: Joi.number()
      .integer()
      .required(),
    music: Joi.string()
      .min(1)
      .max(255)
      .required(),
    singer: Joi.string()
      .min(1)
      .max(255)
      .required(),
    link: Joi.string()
      .min(1)
      .max(255)
      .required()
  });

  ctx.assert(!apply.validate(ctx.request.body).error, 400);

  const getdata = ctx.request.body;

  const data = {
    data: {
      applyMusic: await music.create(getdata)
    }
  };

  ctx.status = 201;

  ctx.body = data;
};

export const checkmusic = async (ctx: Context) => {
  const CheckData = Joi.object({
    status: Joi.number()
      .integer()
      .required()
  });

  ctx.assert(!requestSchema.validate(ctx.params).error, 400);
  ctx.assert(!CheckData.validate(ctx.request.body).error, 400);

  const result = await music.update(ctx.request.body, {
    where: {
      id: ctx.params.id
    }
  });
  ctx.assert(result[0], 404);

  ctx.status = 202;

  const data = {
    data: {
      id: ctx.params.id,
      status: ctx.request.body.status
    }
  };

  ctx.body = data;
};

export const getMusic = async (ctx: Context) => {
  const getdata = await music.findAll();

  const data = {
    data: {
      list: getdata
    }
  };

  ctx.status = 200;

  ctx.body = data;
};

export const deleteMusic = async (ctx: Context) => {
  ctx.assert(!requestSchema.validate(ctx.params).error, 404);

  const result = await music.destroy({ where: { id: ctx.params.id } });
  ctx.assert(result, 404);

  ctx.status = 204;
};
