import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface ScoreArchiveAttributes extends Model {
    id: number,
    user_id: string,
    score: number,
    reason?: string | null
};

export type ScoreArchiveStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ScoreArchiveAttributes;
}

export function ScoreArchiveFactory(sequelize: Sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNulls: false
        },
        reason: {
            type: DataTypes.STRING
        }
    }

    const ScoreArchive = <ScoreArchiveStatic>sequelize.define('ScoreArchive', attributes);

    return ScoreArchive;
}