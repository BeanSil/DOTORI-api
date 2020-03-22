import { Sequelize } from 'sequelize';
import { MusicArchiveFactory } from './MusicArchive';

const sequelize = new Sequelize(
  process.env.DEV_DATABASE_NAME,
  process.env.DEV_DATABASE_ID,
  process.env.DEV_DATABASE_PW,
  {
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'mariadb'
  }
);

const music = MusicArchiveFactory(sequelize);

sequelize.sync();

export { sequelize, Sequelize,music };
