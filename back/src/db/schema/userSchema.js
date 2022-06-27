export default function UserModel(sequelize, DataTypes) {
    return sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "사용자 ID",
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                comment: "사용자 이메일",
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "사용자 별명",
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "사용자 프로필 이미지 url",
            },
            intro: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "자신에 대한 짧은 소개글",
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
                {
                    unique: true,
                    fields: ["email"],
                },
            ],
        },
    );
}
