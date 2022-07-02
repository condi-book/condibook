export default function CategorySchema(sequelize, DataTypes) {
    return sequelize.define(
        "category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "카테고리 ID",
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "카테고리",
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
