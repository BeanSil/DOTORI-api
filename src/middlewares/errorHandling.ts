import { Context, Next } from 'koa';

const errorProvider = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.status = err.status;

    ctx.body = {
      error: {
        status: ctx.status,
        message: err.message
      }
    };
  }
};

export default errorProvider;
