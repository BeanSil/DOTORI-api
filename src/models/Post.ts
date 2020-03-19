import { Sequelize, DataTypes, Model, BuildOptions } from 'sequelize';

interface PostAttribute extends Model {
  readonly post_id: bigint;
  readonly user_id: number;
  readonly board_type: string;
  readonly title: string;
  readonly content: string;
  readonly is_anonymous: boolean;
  readonly created_at?: Date;
  readonly updated_at?: Date;
}

type PostStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PostAttribute;
};

export const PostFactory = (sequelize: Sequelize) => {
  return <PostStatic>sequelize.define('Post', {
    post_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    board_type: {
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
    },
    is_anonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
};
