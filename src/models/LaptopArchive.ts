import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface LaptopArchiveAttrbutes extends Model {
  id: number;
  user_id: number;
  room: number;
  seat: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LaptopArchiveStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): LaptopArchiveAttrbutes;
};

export const LaptopArchiveFactory = (sequelize: Sequelize) => {
  return <LaptopArchiveStatic>sequelize.define('LaptopArchive', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });
};
