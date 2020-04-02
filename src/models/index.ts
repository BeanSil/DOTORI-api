import { Sequelize } from 'sequelize';
import { UserFactory } from './User';
import { db, userDb } from './setting';

const sequelize = new Sequelize(db);

const sequelizeUser = new Sequelize(userDb);

const user = UserFactory(sequelizeUser);

sequelize.createSchema(db.database, {}).then(() => {
  sequelize.sync();
});

sequelizeUser.createSchema(userDb.database, {}).then(() => {
  sequelizeUser.sync();
});

export { sequelize, Sequelize, user };
