export default function GroupModel(sequelize, DataTypes) {
    return sequelize.define(
        "groups",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "그룹 ID",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "그룹 이름",
            },
            explanation: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "그룹 설명",
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
