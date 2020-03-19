import { Context, Next } from 'koa';

// TO-DO: 유저 검증 로직 구현
const validateStudent = async (ctx: Context, next: Next) => {
  ctx.assert(
    ctx.user,
    401,
    "User who is not student can't access to this request."
  );

  await next();
};

const validateAdmin = async (ctx: Context, next: Next) => {
  ctx.assert(
    ctx.user,
    401,
    "User who is not administrator can't access to this request."
  );

  await next();
};

export { validateStudent, validateAdmin };
