import { Sequelize } from 'sequelize';
import { ScoreArchiveFactory } from './ScoreArchive';

const sequelize = new Sequelize(process.env.DEV_DATABASE_NAME, process.env.DEV_DATABASE_ID, process.env.DEV_DATABASE_PW, {
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'mariadb'
});

export const Database = {
    sequelize,
    Sequelize,
    ScoreArchive: ScoreArchiveFactory(sequelize),
}