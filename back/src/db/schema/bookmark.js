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
            favorites: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                comment: "즐겨찾기 여부",
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
