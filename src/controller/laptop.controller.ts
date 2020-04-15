import { Context } from 'koa';
import * as Joi from '@hapi/joi';
import { laptop } from '../models';
import * as sequelize from 'sequelize';

const Op = sequelize.Op;

export const checkLaptop = async (ctx: Context) => {
  const record = await laptop.findOne({
    where: {
      user_id: ctx.user.pid,
      createdAt: new Date().toISOString().slice(0, 10)
    }
  });

  ctx.assert(record, 404);

  ctx.status = 200;
  ctx.body = {
    data: {
      room: record.room,
      seat: record.seat
    }
  };
};

export const applyLaptop = async (ctx: Context) => {
  // TODO: 추후 학습실 배치 이후 수정
  const application = Joi.object().keys({
    room: Joi.number()
      .integer()
      .required(),
    seat: Joi.number()
      .integer()
      .required()
  });

  ctx.assert(!application.validate(ctx.request.body).error, 400);

  // TODO: 현재 노트북 대여 신청 가능한 시간인지 확인

  ctx.assert(
    !(await laptop.findOne({
      where: {
        [Op.or]: [
          {
            user_id: ctx.user.pid,
            createdAt: new Date().toISOString().slice(0, 10)
          },
          {
            room: ctx.request.body.room,
            seat: ctx.request.body.seat,
            createdAt: new Date().toISOString().slice(0, 10)
          }
        ]
      }
    })),
    400
  );

  await laptop.create({
    user_id: ctx.user.pid,
    room: ctx.request.body.room,
    seat: ctx.request.body.seat,
    createdAt: new Date().toISOString().slice(0, 10)
  });

  ctx.status = 201;
};

export const cancelLaptop = async (ctx: Context) => {
  const record = await laptop.findOne({
    where: {
      user_id: ctx.user.pid,
      createdAt: new Date().toISOString().slice(0, 10)
    }
  });

  ctx.assert(record, 400);

  await record.destroy();

  ctx.status = 204;
};
