import { Sequelize } from 'sequelize';
import { UserFactory } from './User';

import { PostFactory } from './Post';

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

const post = PostFactory(sequelize);
const user = UserFactory(sequelizeUser);

sequelize.sync();
sequelizeUser.sync();

export { sequelize, Sequelize, post, user };
