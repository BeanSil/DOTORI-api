import { Sequelize } from 'sequelize';
import { ScoreArchiveFactory } from './ScoreArchive';
import { UserFactory } from './User';
import { PostFactory } from './Post';

import { db, userDb } from './setting';
import { LaptopArchiveFactory } from './LaptopArchive';

const sequelize = new Sequelize(db);

const sequelizeUser = new Sequelize(userDb);

const post = PostFactory(sequelize);
const scoreArchive = ScoreArchiveFactory(sequelize);

const user = UserFactory(sequelizeUser);
const laptop = LaptopArchiveFactory(sequelize);

const sync = sequelize.createSchema(db.database, {}).then(() => {
  return sequelize.sync();
});

const syncUser = sequelizeUser.createSchema(userDb.database, {}).then(() => {
  return sequelizeUser.sync();
});

const waitForSync = Promise.all([sync, syncUser]);

export { sequelize, Sequelize, waitForSync, laptop, post, scoreArchive, user };
