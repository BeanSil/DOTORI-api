import { Sequelize } from 'sequelize';
import { ScoreArchiveFactory } from './ScoreArchive';
import { UserFactory } from './User';

const sequelize = new Sequelize(
  process.env.DEV_DATABASE_NAME,
  process.env.DEV_DATABASE_ID,
  process.env.DEV_DATABASE_PW,
  {
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_PORT as unknown as number || null,
    dialect: 'mariadb'
  }
);

const sequelizeUser = new Sequelize(
  'bean_user',
  process.env.DEV_DATABASE_ID,
  process.env.DEV_DATABASE_PW,
  {
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_PORT as unknown as number || null,
    dialect: 'mariadb'
  }
);

const scoreArchive = ScoreArchiveFactory(sequelize);
const user = UserFactory(sequelizeUser);

sequelize.sync();
sequelizeUser.sync();

export { sequelize, Sequelize, scoreArchive, user };
