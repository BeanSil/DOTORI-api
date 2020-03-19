import { Context } from 'koa';
import * as Joi from '@hapi/joi';

export const getPost = (ctx: Context) => {};

export const getPosts = (ctx: Context) => {};

export const postPost = (ctx: Context) => {
  const NewPost = Joi.object().keys({
    board_type: Joi.string()
      .allow(['자유게시판', '공지사항'])
      .required(),
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    content: Joi.string().required(),
    is_anonymous: Joi.bool()
  });

  ctx.assert(NewPost.validate(ctx.request.body), 400);
};

export const putPost = (ctx: Context) => {};

export const deletePost = (ctx: Context) => {};
