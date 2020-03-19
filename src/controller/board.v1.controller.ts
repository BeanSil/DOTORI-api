import { Context } from 'koa';
import * as Joi from '@hapi/joi';
import { post } from '../models';

const PostIdInParam = Joi.object().keys({
  id: Joi.number()
    .integer()
    .min(1)
    .required()
});

export const getPost = async (ctx: Context) => {
  ctx.assert(PostIdInParam.validate(ctx.params), 400);

  ctx.body = await post.findByPk(ctx.params.postid);
};

export const getPosts = async (ctx: Context) => {
  ctx.body = await post.findAll({
    offset: 0,
    limit: 20,
  }); // TODO: add pagination
};

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
