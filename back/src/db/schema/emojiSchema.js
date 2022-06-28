export default function EmojiSchema(sequelize, DataTypes) {
    return sequelize.define(
        "emoji",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "이모지 ID",
            },
            emoji: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "이모지",
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
