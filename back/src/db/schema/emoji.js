export default function EmojiModel(sequelize, DataTypes) {
    return sequelize.define(
        "emojis",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "이모지 ID",
            },
            website_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "사이트 ID",
            },
            emoji: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "이모지",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        },
    );
}
