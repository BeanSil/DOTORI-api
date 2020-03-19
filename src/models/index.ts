import { Sequelize } from 'sequelize';
import { ScoreArchiveFactory } from './ScoreArchive';
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

const scoreArchive = ScoreArchiveFactory(sequelize);
const user = UserFactory(sequelize);

const models = [ scoreArchive, user ];

const _models = Object.values<any>(models);

_models
  .filter(_model => typeof _model.associate === "function")
  .forEach(_model => _model.associate(_models));

sequelize.sync();

export {
    sequelize,
    Sequelize,
    scoreArchive,
    user
}
