export default function KeywordModel(sequelize, DataTypes) {
    return sequelize.define(
        "keywords",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "키워드 ID",
            },
            website_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "사이트 ID",
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
