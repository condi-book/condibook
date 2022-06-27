export default function TeamModel(sequelize, DataTypes) {
    return sequelize.define(
        "team",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "팀 ID",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "팀 이름",
            },
            explanation: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "팀 설명",
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
