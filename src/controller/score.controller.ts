import { Context, Next } from 'koa';
import { Database } from '../models';

Database.sequelize.sync();

export async function getAllArchives(ctx: Context, next: Next) {
    const data = {
        data: {
            archives: await Database.ScoreArchive.findAll()
        }
    }

    ctx.body = data;
}

export async function insertArchive(ctx: Context, next: Next) {
    const archive = ctx.request.body;

    const data = {
        insertedArchive: await Database.ScoreArchive.create(archive)
    }

    ctx.body = data;
}

export async function updateArchive(ctx: Context, next: Next) {
    const updatedArchive = ctx.request.body.data;
    const conditions = ctx.request.body.conditions;

    const currentArchive = await Database.ScoreArchive.findAll({
        where: conditions
    });

    const data = {
        result: await Database.ScoreArchive.update(updatedArchive, {
            where: conditions
        }),
        updatedArchive: currentArchive,
        currentArchive: await Database.ScoreArchive.findAll({
            where: conditions
        })
    }

    ctx.body = data;
}

export async function removeArchive(ctx: Context, next: Next) {
    const conditions = ctx.request.body;

    const deletedArchive = await Database.ScoreArchive.findAll({
        where: conditions
    });

    const data = {
        result: await Database.ScoreArchive.destroy({
            where: conditions
        }),
        deletedArchive: deletedArchive
    };

    ctx.body = data;
}
