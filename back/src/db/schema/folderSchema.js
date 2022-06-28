export default function FolderSchema(sequelize, DataTypes) {
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
