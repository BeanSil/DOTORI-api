import { Context, Next } from 'koa';

// TO-DO: 유저 검증 로직 구현
const validateStudent = async function (ctx: Context, next: Next) {
    ctx.assert(ctx.user, 401, 'User who is not student can\'t access to this request.');
    
    return await next();
};

const validateAdmin = async function (ctx: Context, next: Next) {
    ctx.assert(ctx.user, 401, 'User who is not administrator can\'t access to this request.');
    
    return await next();
};

export {
    validateStudent,
    validateAdmin
}