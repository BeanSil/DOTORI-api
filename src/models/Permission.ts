import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

interface PermissionAttribute extends Model {
}

type PermissionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PermissionAttribute;
};

export const PermissionFactory = (sequelize: Sequelize) => {
  return <PermissionStatic>sequelize.define('Permission', {
  });
};
