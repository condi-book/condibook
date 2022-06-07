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
            ],
        },
    );
}
