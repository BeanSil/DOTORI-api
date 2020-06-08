import { Context } from 'koa';
import * as Joi from '@hapi/joi';
import { post } from '../models';

const PostIdInParam = Joi.object()
  .keys({
    postid: Joi.number()
      .integer()
      .min(1)
  })
  .unknown(true);

const BoardTypeInParam = Joi.object()
  .keys({
    board: Joi.string().valid('freeboard', 'anonymous', 'notice')
  })
  .unknown(true);

export const getPost = async (ctx: Context) => {
  ctx.assert(!BoardTypeInParam.validate(ctx.params).error, 404);
  ctx.assert(!PostIdInParam.validate(ctx.params).error, 400);

  const result = await post.findOne({
    where: {
      post_id: ctx.params.postid,
      board_type: ctx.params.board
    }
  });

  ctx.assert(result, 404);

  ctx.body = {
    data: result
  };
};

export const getPosts = async (ctx: Context) => {
  ctx.assert(!BoardTypeInParam.validate(ctx.params).error, 404);
  // TODO: 404 추가, page joi 검사 추가

  ctx.body = {
    data: await post.findAll({
      where: {
        board_type: ctx.params.board
      },
      offset: 20 * ctx.params.page || 0,
      limit: 20
    })
  };
};

export const putPost = async (ctx: Context) => {
  ctx.assert(!BoardTypeInParam.validate(ctx.params).error, 404);

  const NewPost = Joi.object().keys({
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    content: Joi.string().required(),
    is_anonymous: Joi.boolean()
  });

  ctx.assert(!NewPost.validate(ctx.request.body).error, 400);

  const body = ctx.request.body;
  body.user_id = ctx.user.pid;
  body.board_type = ctx.params.board;

  const result = await post.create(body);

  ctx.status = 201;

  ctx.body = {
    isCreated: true,
    data: result
  };
};

export const postPost = async (ctx: Context) => {
  ctx.assert(!BoardTypeInParam.validate(ctx.params).error, 404);

  const OldPost = Joi.object().keys({
    title: Joi.string()
      .min(1)
      .max(255),
    content: Joi.string(),
    is_anonymous: Joi.boolean()
  });

  // TODO: 회원 권한 검사 (본인)

  console.log(OldPost.validate(ctx.request.body).error);
  ctx.assert(!PostIdInParam.validate(ctx.params).error, 400);
  ctx.assert(!OldPost.validate(ctx.request.body).error, 400);

  const result = await post.update(ctx.request.body, {
    where: {
      post_id: ctx.params.postid
    }
  });
  ctx.assert(result[0], 404);

  ctx.status = 200;
  ctx.body = {
    data: await post.findByPk(ctx.params.postid)
  };
};

export const deletePost = async (ctx: Context) => {
  ctx.assert(!BoardTypeInParam.validate(ctx.params).error, 404);

  ctx.assert(!PostIdInParam.validate(ctx.params).error, 404);

  // TODO: 회원 권한 검사 (본인 or 관리자)

  const result = await post.destroy({
    where: {
      board_type: ctx.params.board,
      post_id: ctx.params.postid
    }
  });

  ctx.assert(result, 404);

  ctx.status = 200;
};
