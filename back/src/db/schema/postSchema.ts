export default function PostSchema(sequelize, DataTypes) {
    return sequelize.define(
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
                default: false,
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
