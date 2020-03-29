import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface MusicArchiveAttrbutes extends Model {
    id: number;
    user_id: number;
    music: string;
    singer: string;
    link: string;
    status: number;
}

export type MusicArchiveStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MusicArchiveAttrbutes;
};

export const MusicArchiveFactory = (sequelize: Sequelize) => {
  return <MusicArchiveStatic>sequelize.define('MusicArchive', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    music: {
      type: DataTypes.STRING,
      allowNull: false
    },
    singer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
};
