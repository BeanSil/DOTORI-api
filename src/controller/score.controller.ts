import { Context } from 'koa';
import * as Joi from '@hapi/joi';

import { scoreArchive } from '../models';

export const getUserScore = async (ctx: Context) => {
  const user = ctx.user;

  const archive = await scoreArchive.findAll({
    where: {
      user_id: user.id
    }
  });

  const scores = archive.map((archive: any) => archive.score);

  const data = {
    data: {
      name: user.name,
      scores: scores
    }
  };

  ctx.body = data;
};

export const getAllArchives = async (ctx: Context) => {
  const archives = await scoreArchive.findAll();

  // TO-DO: 불러온 아카이브 데이터 중 user_id로 User 데이터 불러오기

  const data = {
    data: {
      archives: archives
    }
  };

  ctx.body = data;
};

export const insertArchive = async (ctx: Context) => {
  const archiveSchema = Joi.object({
    score: Joi.number()
      .integer()
      .required(),
    user_id: Joi.number()
      .integer()
      .required(),
    reason: Joi.string().max(255)
  });

  // ***
  // TO-DO: Concurrency 적용하기
  const archive = await archiveSchema.validateAsync(ctx.request.body);

  const insertedArchive = await scoreArchive.create(archive);
  // ***

  const data = {
    data: {
      insertedArchive: insertedArchive
    }
  };

  ctx.body = data;
};

export const updateArchive = async (ctx: Context) => {
  const requestSchema = Joi.object({
    data: {
      score: Joi.number()
        .integer()
        .required(),
      user_id: Joi.number()
        .integer()
        .required(),
      reason: Joi.string().max(255)
    },
    conditions: {
      id: Joi.number()
        .integer()
        .required()
    }
  }).with('data', 'conditions');

  // ***
  // TO-DO: Concurrency 적용하기
  const requested = await requestSchema.validateAsync(ctx.request.body);

  const provided = requested.data;
  const conditions = requested.conditions;

  const result = await scoreArchive.update(provided, {
    where: conditions
  });
  // ***

  const data = {
    data: {
      result: result
    }
  };

  ctx.body = data;
};

export const deleteArchive = async (ctx: Context) => {
  const requestSchema = Joi.object({
    id: Joi.number()
      .integer()
      .required()
  });

  // ***
  // TO-DO: Concurrency 적용하기
  const conditions = await requestSchema.validateAsync(ctx.request.body);

  const result = await scoreArchive.destroy({
    where: conditions
  });
  // ***

  const data = {
    data: {
      result: result
    }
  };

  ctx.body = data;
};
