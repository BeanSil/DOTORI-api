import { Sequelize } from 'sequelize';
import { UserFactory } from './User';
import { db, userDb } from './setting';

const sequelize = new Sequelize(db);

const sequelizeUser = new Sequelize(userDb);

const user = UserFactory(sequelizeUser);

const sync = sequelize.createSchema(db.database, {}).then(() => {
  return sequelize.sync();
});

const syncUser = sequelizeUser.createSchema(userDb.database, {}).then(() => {
  return sequelizeUser.sync();
});

const waitForSync = Promise.all([sync, syncUser]);

export { sequelize, Sequelize, waitForSync, user };
