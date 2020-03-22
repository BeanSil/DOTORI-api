import { Sequelize } from 'sequelize';
import { MusicArchiveFactory } from './MusicArchive';
import { UserFactory } from './User';

const sequelize = new Sequelize(
  process.env.DEV_DATABASE_NAME,
  process.env.DEV_DATABASE_ID,
  process.env.DEV_DATABASE_PW,
  {
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'mariadb'
  }
);

const sequelizeUser = new Sequelize(
  'bean_user',
  process.env.DEV_DATABASE_ID,
  process.env.DEV_DATABASE_PW,
  {
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'mariadb'
  }
);

const music = MusicArchiveFactory(sequelize);
const user = UserFactory(sequelizeUser);

sequelize.sync();
sequelizeUser.sync();

export { sequelize, Sequelize, music, user };
