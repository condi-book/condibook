export default function BookmarkModel(sequelize, DataTypes) {
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
                allowNull: false,
                comment: "북마크 순서",
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
