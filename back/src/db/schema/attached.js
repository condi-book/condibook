export default function AttachedModel(sequelize, DataTypes) {
    return sequelize.define(
        "attacheds",
        {
            bookmark_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "북마크 ID",
            },
            board_id: {
                type: DataTypes.STRING,
                primaryKey: true,
                comment: "게시글 ID",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        },
    );
}
