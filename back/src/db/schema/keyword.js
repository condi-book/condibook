export default function KeywordModel(sequelize, DataTypes) {
    return sequelize.define(
        "keyword",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "키워드 ID",
            },
            keyword: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "키워드",
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
