import { Options } from 'sequelize';
import { Dialect } from 'sequelize/types/lib/sequelize';

export const db: Options = {
  username: process.env.DATABASE_ID,
  password: process.env.DATABASE_PW,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST || 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-9'
  }
};

export const userDb: Options = {
  username: process.env.USER_DATABASE_ID,
  password: process.env.USER_DATABASE_PW,
  database: process.env.USER_DATABASE_NAME,
  host: process.env.USER_DATABASE_HOST || 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-9'
  }
};
