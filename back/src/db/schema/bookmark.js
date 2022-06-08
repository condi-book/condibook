export default function BookmarkModel(sequelize, DataTypes) {
    return sequelize.define(
        "bookmarks",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "북마크 ID",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
        },
    );
}
