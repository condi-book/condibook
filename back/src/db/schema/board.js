export default function BoardModel(sequelize, DataTypes) {
    return sequelize.define(
        "boards",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                comment: "게시글 ID",
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
            author_name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "사용자 닉네임",
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
