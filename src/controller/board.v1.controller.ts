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

  ctx.body = {
    data: await post.findByPk(ctx.params.postid)
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

export const postPost = async (ctx: Context) => {
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

  ctx.assert(!NewPost.validate(ctx.request.body).error, 400);

  const body = ctx.request.body;
  body.user_id = ctx.user.id;

  const result = await post.create(body);

  ctx.status = 201;

  ctx.body = {
    isCreated: true,
    data: result
  };
};

export const putPost = async (ctx: Context) => {
  const OldPost = Joi.object().keys({
    board_type: Joi.string().valid('자유게시판', '공지사항'),
    title: Joi.string()
      .min(1)
      .max(255),
    content: Joi.string(),
    is_anonymous: Joi.bool()
  });

  // TODO: 회원 권한 검사 (본인)

  ctx.assert(!PostIdInParam.validate(ctx.params).error, 400);
  ctx.assert(!OldPost.validate(ctx.request.body).error, 400);

  ctx.assert(
    !(await post.update(ctx.request.body, {
      where: {
        post_id: ctx.params.postid
      }
    })),
    404
  );

  ctx.status = 200;
};

export const deletePost = async (ctx: Context) => {
  ctx.assert(PostIdInParam.validate(ctx.params), 400);

  // TODO: 회원 권한 검사 (본인 or 관리자)

  ctx.assert(!(await post.destroy(ctx.params.postid)), 404);

  ctx.status = 200;
};
