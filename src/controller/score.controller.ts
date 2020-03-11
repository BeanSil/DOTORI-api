import { Context } from 'koa';
import { scoreArchive } from '../models';

export const getUserScore = async (ctx: Context) => {
    const user = ctx.user;
 
    const archive = await scoreArchive.findAll({
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

export const getAllArchives = async (ctx: Context) => {
    const archives = await scoreArchive.findAll();
    
    //TO-DO: 불러온 아카이브 데이터 중 user_id로 User 데이터 불러오기

    const data = {
        data: {
            archives: archives
        }
    };

    ctx.body = data;
}

export const insertArchive = async (ctx: Context) => {
    const archive = ctx.request.body;

    const data = {
        data: {
            insertedArchive: await scoreArchive.create(archive)
        }
    };

    ctx.body = data;
}

export const updateArchive = async (ctx: Context) => {
    const provided = ctx.request.body.data;
    const conditions = ctx.request.body.conditions;

    const currentArchive = await scoreArchive.findAll({
        where: conditions
    });

    const result = await scoreArchive.update(provided, {
        where: conditions
    });

    const updatedArchive = await scoreArchive.findAll({
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

export const removeArchive = async (ctx: Context) => {
    const conditions = ctx.request.body;

    const deletedArchive = await scoreArchive.findAll({
        where: conditions
    });

    const data = {
        data: {
            result: await scoreArchive.destroy({
                where: conditions
            }),
            deletedArchive: deletedArchive
        }
    };

    ctx.body = data;
}