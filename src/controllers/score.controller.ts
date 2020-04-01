import { Context } from 'koa';
import * as Joi from '@hapi/joi';

import { scoreArchive, user } from '../models';

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
  const _archives = await scoreArchive.findAll();

  const userFetched = _archives.map(fetchUserPipeline);
  const archives = await Promise.all(userFetched);

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

  const [_, insertedArchive] = await Promise.all([
    await archiveSchema.validateAsync(ctx.request.body),
    await scoreArchive.create(ctx.request.body)
  ]);

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

  const requested = ctx.request.body;
  const provided = requested.data;
  const conditions = requested.conditions;

  const [_, result] = await Promise.all([
    await requestSchema.validateAsync(ctx.request.body),
    await scoreArchive.update(provided, {
      where: conditions
    })
  ]);

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

  const [_, result] = await Promise.all([
    await requestSchema.validateAsync(ctx.request.body),
    await scoreArchive.destroy({
      where: ctx.request.body
    })
  ]);

  const data = {
    data: {
      result: result
    }
  };

  ctx.body = data;
};

const fetchUserPipeline = async (archive: any) => {
  archive.user = await user.findByPk(archive.id);

  return archive;
};
