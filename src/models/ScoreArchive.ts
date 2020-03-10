import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface ScoreArchiveAttributes extends Model {
    id: number,
    score: number,
    reason?: string | null,
    createdAt?: Date,
    updatedAt?: Date
};

export type ScoreArchiveStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ScoreArchiveAttributes;
    associate(models: any): void;
}

export function ScoreArchiveFactory(sequelize: Sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        score: {
            type: DataTypes.INTEGER,
            allowNulls: false
        },
        reason: {
            type: DataTypes.STRING
        }
    }

    const foreignKeyOptions = {
        foreignKey: { 
            allowNull: false,
            name: 'user_id'
        }, 
        onDelete: 'CASCADE'
    }

    const ScoreArchive = <ScoreArchiveStatic>sequelize.define('ScoreArchive', attributes);

    ScoreArchive.associate = function (models: any) {
        models.filter((model: any) => model.tableName === 'Users')
            .map((model: any) => {
                model.hasMany(ScoreArchive, foreignKeyOptions);
                ScoreArchive.belongsTo(model, foreignKeyOptions);
            })
    };

    return ScoreArchive;
}