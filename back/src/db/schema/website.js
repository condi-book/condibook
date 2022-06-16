export default function WebsiteModel(sequelize, DataTypes) {
    return sequelize.define(
        "website",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "사이트 ID",
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "사이트 링크",
            },
            meta_title: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "메타 제목",
            },
            meta_description: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "메타 내용",
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
