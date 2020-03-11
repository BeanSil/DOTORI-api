import { Context, Next } from 'koa';
import { models } from '../models';

export async function getUserScore(ctx: Context, next: Next) {
    const user = ctx.user;

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
    const archives = await models.ScoreArchive.findAll();
    
    //TO-DO: 불러온 아카이브 데이터 중 user_id로 User 데이터 불러오기

    const data = {
        data: {
            archives: archives
        }
    };

    ctx.body = data;
}

export async function insertArchive(ctx: Context, next: Next) {
    const archive = ctx.request.body;

    const data = {
        data: {
            insertedArchive: await models.ScoreArchive.create(archive)
        }
    };

    ctx.body = data;
}

export async function updateArchive(ctx: Context, next: Next) {
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