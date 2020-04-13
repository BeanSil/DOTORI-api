import { Sequelize } from 'sequelize';
import { MusicArchiveFactory } from './MusicArchive';
import { ScoreArchiveFactory } from './ScoreArchive';
import { UserFactory } from './User';
import { PostFactory } from './Post';

import { db, userDb } from './setting';

const sequelize = new Sequelize(db);

const sequelizeUser = new Sequelize(userDb);

const music = MusicArchiveFactory(sequelize);
const post = PostFactory(sequelize);
const scoreArchive = ScoreArchiveFactory(sequelize);

const user = UserFactory(sequelizeUser);

const sync = sequelize.createSchema(db.database, {}).then(() => {
  return sequelize.sync();
});

const syncUser = sequelizeUser.createSchema(userDb.database, {}).then(() => {
  return sequelizeUser.sync();
});

const waitForSync = Promise.all([sync, syncUser]);

export { sequelize, Sequelize, waitForSync, post, scoreArchive, music, user };
