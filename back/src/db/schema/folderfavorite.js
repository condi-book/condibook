export default function FDFavoriteModel(sequelize, DataTypes) {
    return sequelize.define(
        "fdfavorite",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "폴더 즐겨찾기 ID",
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
