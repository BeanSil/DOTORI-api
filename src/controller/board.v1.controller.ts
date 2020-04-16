import { Context } from 'koa';
import * as Joi from '@hapi/joi';
import { post } from '../models';

const PostIdInParam = Joi.object().keys({
  postid: Joi.number()
    .integer()
    .min(1)
    .required()
});

export const getPost = async (ctx: Context) => {
  ctx.assert(!PostIdInParam.validate(ctx.params).error, 400);

  const result = await post.findByPk(ctx.params.postid);

  ctx.assert(result, 404);

  ctx.body = {
    data: result
  };
};

export const getPosts = async (ctx: Context) => {
  ctx.body = {
    data: await post.findAll({
      offset: 20 * ctx.params.page || 0,
      limit: 20
    })
  };
};

export const putPost = async (ctx: Context) => {
  const NewPost = Joi.object().keys({
    board_type: Joi.string()
      .valid('자유게시판', '대나무숲', '공지사항')
      .required(),
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    content: Joi.string().required()
  });

  ctx.assert(!NewPost.validate(ctx.request.body).error, 400);

  const body = ctx.request.body;
  body.user_id = ctx.user.pid;

  const result = await post.create(body);

  ctx.status = 201;

  ctx.body = {
    isCreated: true,
    data: result
  };
};

export const postPost = async (ctx: Context) => {
  const OldPost = Joi.object().keys({
    board_type: Joi.string().valid('자유게시판', '대나무숲', '공지사항'),
    title: Joi.string()
      .min(1)
      .max(255),
    content: Joi.string()
  });

  // TODO: 회원 권한 검사 (본인)

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
  ctx.assert(!PostIdInParam.validate(ctx.params).error, 404);

  // TODO: 회원 권한 검사 (본인 or 관리자)

  const result = await post.destroy({ where: { post_id: ctx.params.postid } });
  ctx.assert(result, 404);

  ctx.status = 200;
};
