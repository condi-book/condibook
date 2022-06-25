export default function PostModel(sequelize, DataTypes) {
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
            ],
        },
    );
}
