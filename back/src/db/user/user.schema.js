export default function UserModel(sequelize, DataTypes) {
    return sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "사용자 ID",
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "사용자 별명",
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "사용자 이메일",
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: "사용자 프로필 이미지 url",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
        },
    );
}
