export default function CommentModel(sequelize, DataTypes) {
    return sequelize.define(
        "comments",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "댓글 ID",
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: "작성자 ID",
            },
            board_id: {
                type: DataTypes.UUID,
                allowNull: false,
                comment: "게시글 ID",
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
                comment: "댓글 내용",
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
                {
                    unique: false,
                    fields: ["board_id"],
                },
                {
                    unique: false,
                    fields: ["user_id"],
                },
            ],
        },
    );
}
