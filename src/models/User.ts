import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

export interface UserAttributes extends Model {
    id: number,
    name: string,
    createdAt?: Date,
    updatedAt?: Date
}

export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserAttributes;
}

export function UserFactory(sequelize: Sequelize) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNulls: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }

    const User = <UserStatic>sequelize.define('User', attributes);

    return User;
}