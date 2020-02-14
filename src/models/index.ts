import { Sequelize } from "sequelize";
import * as config from '../modules/dbInfo'

const sequelize = new Sequelize(config.database, config.id, config.pw, {
    host: config.host,
    dialect: config.dialect
});

export { sequelize, Sequelize };