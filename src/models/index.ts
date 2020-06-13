import { Sequelize } from 'sequelize';
import { MusicArchiveFactory } from './MusicArchive';
import { ScoreArchiveFactory } from './ScoreArchive';
import { UserFactory } from './User';
import { PostFactory } from './Post';
import { LaptopArchiveFactory } from './LaptopArchive';

import { db, userDb } from './setting';
import {PermissionFactory} from "./Permission";

const sequelize = new Sequelize(db);

const sequelizeUser = new Sequelize(userDb);

const laptop = LaptopArchiveFactory(sequelize);
const music = MusicArchiveFactory(sequelize);
const permission = PermissionFactory(sequelize);
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

export {
  sequelize,
  Sequelize,
  waitForSync,
  laptop,
  permission,
  post,
  scoreArchive,
  music,
  user
};
