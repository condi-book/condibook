export default function AttachedModel(sequelize, DataTypes) {
    return sequelize.define(
        "attached",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "어피치 ID",
            },
            keyword: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "키워드",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: false,
        },
    );
}
