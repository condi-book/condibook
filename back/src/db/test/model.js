export default function TestModel(sequelize, DataTypes) {
    return sequelize.define("Test", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: "사용자 ID",
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "사용자 이름",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "사용자 이메일",
        },
    });
}
