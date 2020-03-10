import { Context, Next } from 'koa';
import { Database } from '../models';

Database.sequelize.sync();

export async function getUserScore(ctx: Context, next: Next) {
    /* TO-DO: 토큰 검증 후 state 객체에 User 데이터가 불러오도록
    const user = ctx.state.user
    */

    // 토큰 구현 후 삭제 예정
    const user = {
        id: 1,
        name: "박준영"
    }
    
    let archive = await Database.models.ScoreArchive.findAll({
        where: {
            UserId: user.id
        }
    });
    
    const scores = archive.map((archive: any) => archive.score)

    const data = {
        data: {
            name: user.name,
            archive: scores
        }
    }

    ctx.body = data;
}

export async function getAllArchives(ctx: Context, next: Next) {
    const data = {
        data: {
            archives: await Database.models.ScoreArchive.findAll()
        }
    }

    ctx.body = data;
}

export async function insertArchive(ctx: Context, next: Next) {
    const archive = ctx.request.body;

    const data = {
        insertedArchive: await Database.models.ScoreArchive.create(archive)
    }

    ctx.body = data;
}

export async function updateArchive(ctx: Context, next: Next) {
    const updatedArchive = ctx.request.body.data;
    const conditions = ctx.request.body.conditions;

    const currentArchive = await Database.models.ScoreArchive.findAll({
        where: conditions
    });

    const data = {
        result: await Database.models.ScoreArchive.update(updatedArchive, {
            where: conditions
        }),
        updatedArchive: currentArchive,
        currentArchive: await Database.models.ScoreArchive.findAll({
            where: conditions
        })
    }

    ctx.body = data;
}

export async function removeArchive(ctx: Context, next: Next) {
    const conditions = ctx.request.body;

    const deletedArchive = await Database.models.ScoreArchive.findAll({
        where: conditions
    });

    const data = {
        result: await Database.models.ScoreArchive.destroy({
            where: conditions
        }),
        deletedArchive: deletedArchive
    };

    ctx.body = data;
}
