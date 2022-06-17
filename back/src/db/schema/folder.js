export default function FolderModel(sequelize, DataTypes) {
    return sequelize.define(
        "folder",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "폴더 ID",
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "폴더 이름",
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
