import { Context } from 'koa';
import { laptop, music, scoreArchive } from '../models';

export const getSummary = async (ctx: Context) => {
  const user = ctx.user;

  const [score, laptopRecord, musics] = await Promise.all([
    scoreArchive.findAll({
      where: {
        user_id: user.pid
      }
    }),
    laptop.findOne({
      where: {
        user_id: ctx.user.pid,
        createdAt: new Date().toISOString().slice(0, 10)
      }
    }),
    music.findAll({
      where: {
        user_id: ctx.user.pid,
        createdAt: new Date().toISOString().slice(0, 10)
      }
    })
  ]);

  const scores = score.map(
    /* istanbul ignore next */ (archive: any) => archive.score
  );

  ctx.body = {
    data: {
      score: scores,
      laptop: {
        room: laptopRecord.room,
        seat: laptopRecord.seat
      },
      music: musics,
      permissionLevel: user.authority()
    }
  };
};
