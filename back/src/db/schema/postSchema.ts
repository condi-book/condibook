import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface postSchemaInterface {
    id: number;
    title: string;
    content: Text | null;
    views: number;
    author_name: string;
    like_counts: number;
    is_deleted: boolean;
}

export interface PostModel
    extends Model<postSchemaInterface>,
        postSchemaInterface {}
export type PostStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): PostModel;
};

export default function PostSchema(sequelize: Sequelize) {
    return <PostStatic>sequelize.define(
        "post",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "게시글 ID",
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "제목",
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "내용",
            },
            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
                comment: "조회수",
            },
            author_name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "게시글 작성자 닉네임",
            },
            like_counts: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
                comment: "게시글 좋아요 갯수",
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                comment: "논리삭제 확인",
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
                {
                    type: "FULLTEXT",
                    name: "post_idx",
                    fields: ["title", "content"],
                    parser: "ngram",
                },
            ],
        },
    );
}
