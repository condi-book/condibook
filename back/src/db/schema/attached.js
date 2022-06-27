export default function AttachedModel(sequelize, DataTypes) {
    return sequelize.define(
        "attached",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "첨부 ID",
            },
        },
        {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
            timestamps: false,
            indexex: [
                {
                    unique: true,
                    fields: ["id"],
                },
            ],
        },
    );
}
