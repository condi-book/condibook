export default function BoardModel(sequelize, DataTypes) {
    return sequelize.define(
        "boards",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                comment: "게시글 ID",
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: true,
                comment: "사용자 ID",
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "제목",
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: "내용",
            },
            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
                comment: "조회수",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
            indexes: [
                {
                    unique: true,
                    fields: ["id", "user_id"],
                },
                {
                    unique: false,
                    fields: ["user_id"],
                },
            ],
        },
    );
}
