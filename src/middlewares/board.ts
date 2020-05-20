import { Context, Next } from 'koa';
import * as Joi from '@hapi/joi';

const boardTypeChecker = async (ctx: Context, next: Next) => {
  const BoardTypeInParam = Joi.object().keys({
    board: Joi.string()
      .valid('freeboard', 'anonymous', 'notice')
      .required()
  });

  ctx.assert(!BoardTypeInParam.validate(ctx.params).error, 404);

  await next();
};

export default boardTypeChecker;
