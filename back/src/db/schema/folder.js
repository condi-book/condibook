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
