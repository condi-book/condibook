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
            charset: "utf8",
            collate: "utf8_general_ci",
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
