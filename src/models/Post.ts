import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

interface PostModel extends Model {
    readonly postid: bigint;
    readonly boardType: string;
    readonly title: string;
    readonly content: string;

}

type PostModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): PostModel;
}

export const Post = (sequelize: Sequelize) => {
    return <PostModelStatic>sequelize.define('Board', {
        postid: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        boardType: {
            type: DataTypes.STRING(5),
            values: ['자유게시판', '공지사항'],
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING('long'),
            allowNull: false
        }
    })
};