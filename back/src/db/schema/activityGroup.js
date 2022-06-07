export default function ActivityGroupModel(sequelize, DataTypes) {
    return sequelize.define(
        "activity_groups",
        {
            user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "사용자 ID",
            },
            group_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "그룹 ID",
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
        },
    );
}
