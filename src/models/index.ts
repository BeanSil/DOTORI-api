import { Sequelize } from 'sequelize';
import { ScoreArchiveFactory } from './ScoreArchive';

const sequelize = new Sequelize(
  process.env.DEV_DATABASE_NAME,
  process.env.DEV_DATABASE_ID,
  process.env.DEV_DATABASE_PW,
  {
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'mariadb'
  }
);

const scoreArchive = ScoreArchiveFactory(sequelize);

sequelize.sync();

export { sequelize, Sequelize, scoreArchive };