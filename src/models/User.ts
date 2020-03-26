import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

interface UserAttribute extends Model {
  readonly pid: bigint;
  readonly email: string;
  readonly pw: string;
  readonly name: string;
  readonly grade?: number;
  readonly class?: number;
  readonly number?: number;
  readonly suspended_until: Date;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserAttribute;
};

export const UserFactory = (sequelize: Sequelize) => {
  return <UserStatic>sequelize.define('User', {
    pid: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pw: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    class: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    suspended_until: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 0
    }
  });
};
