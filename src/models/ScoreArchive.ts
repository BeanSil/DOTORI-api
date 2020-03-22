import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface ScoreArchiveAttributes extends Model {
  readonly id: number;
  readonly score: number;
  readonly reason?: string | null;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export type ScoreArchiveStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScoreArchiveAttributes;
};

export const ScoreArchiveFactory = (sequelize: Sequelize) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNulls: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNulls: false
    },
    reason: {
      type: DataTypes.STRING
    }
  };

  return <ScoreArchiveStatic>sequelize.define('ScoreArchive', attributes);
};