export default function CommentModel(sequelize, DataTypes) {
    return sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "댓글 ID",
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: "댓글 내용",
            },
            author_name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "댓글 작성자 닉네임",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
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
