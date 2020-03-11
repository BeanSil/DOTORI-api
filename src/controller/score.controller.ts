import { Context, Next } from 'koa';
import { sequelize, models } from '../models';

sequelize.sync();

export async function getUserScore(ctx: Context, next: Next) {
    const user = ctx.user;

    //TO-DO: User가 학생 유저인지 검증하는 로직 구현
    ctx.assert(user, 401, 'User who is not student can\'t access to this request.');

    const archive = await models.ScoreArchive.findAll({
        where: {
            user_id: user.id
        }
    })
    
    const scores = archive.map((archive: any) => archive.score);

    const data = {
        data: {
            name: user.name,
            scores: scores
        },

    };

    ctx.body = data;
}

export async function getAllArchives(ctx: Context, next: Next) {
    const user = ctx.user;

    //TO-DO: User가 관리자 유저인지 검증하는 로직 구현
    ctx.assert(user, 401, 'User who is not administrator can\'t access to this request.');

    const data = {
        data: {
            archives: await models.ScoreArchive.findAll()
        }
    };

    ctx.body = data;
}

export async function insertArchive(ctx: Context, next: Next) {
    const user = ctx.user;

    //TO-DO: User가 관리자 유저인지 검증하는 로직 구현
    ctx.assert(user, 401, 'User who is not administrator can\'t access to this request.');

    const archive = ctx.request.body;

    const data = {
        data: {
            insertedArchive: await models.ScoreArchive.create(archive)
        }
    };

    ctx.body = data;
}

export async function updateArchive(ctx: Context, next: Next) {
    const user = ctx.user;

    //TO-DO: User가 관리자 유저인지 검증하는 로직 구현
    ctx.assert(user, 401, 'User who is not administrator can\'t access to this request.');

    const provided = ctx.request.body.data;
    const conditions = ctx.request.body.conditions;

    const currentArchive = await models.ScoreArchive.findAll({
        where: conditions
    });

    const result = await models.ScoreArchive.update(provided, {
        where: conditions
    });

    const updatedArchive = await models.ScoreArchive.findAll({
        where: conditions
    });

    //TO-DO: 수정 전(currentArchive)과 수정 후(updatedArchive)가 같은 경우 에러 Throw

    const data = {
        data: {
            result: result,
            updatedArchive: currentArchive,
            currentArchive: updatedArchive
        }
    };

    ctx.body = data;
}

export async function removeArchive(ctx: Context, next: Next) {
    const user = ctx.user;

    //TO-DO: User가 관리자 유저인지 검증하는 로직 구현
    ctx.assert(user, 401, 'User who is not administrator can\'t access to this request.');

    const conditions = ctx.request.body;

    const deletedArchive = await models.ScoreArchive.findAll({
        where: conditions
    });

    const data = {
        data: {
            result: await models.ScoreArchive.destroy({
                where: conditions
            }),
            deletedArchive: deletedArchive
        }
    };

    ctx.body = data;
}