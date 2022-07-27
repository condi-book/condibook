export default function BookmarkSchema(sequelize, DataTypes) {
    return sequelize.define(
        "bookmark",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "북마크 ID",
            },
            order_idx: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: "북마크 순서",
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
