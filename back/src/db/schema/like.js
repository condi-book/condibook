export default function LikeModel(sequelize, DataTypes) {
    return sequelize.define(
        "likes",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "좋아요 ID",
            },
            user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "사용자 ID",
            },
            board_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "게시물 ID",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["user_id", "board_id"],
                },
                {
                    unique: false,
                    fields: ["user_id"],
                },
                {
                    unique: false,
                    fields: ["board_id"],
                },
            ],
        },
    );
}
