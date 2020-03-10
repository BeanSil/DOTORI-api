import { Sequelize } from 'sequelize';
import { ScoreArchiveFactory } from './ScoreArchive';
import { UserFactory } from './User';

const sequelize = new Sequelize(process.env.DEV_DATABASE_NAME, process.env.DEV_DATABASE_ID, process.env.DEV_DATABASE_PW, {
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'mariadb'
});

const models = {
    ScoreArchive: ScoreArchiveFactory(sequelize),
    User: UserFactory(sequelize)
}

Object.values<any>(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

export const Database = {
    sequelize,
    Sequelize,
    models
}