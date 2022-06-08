export default function ActivityGroupModel(sequelize, DataTypes) {
    return sequelize.define(
        "activity_groups",
        {
            member_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                comment: "회원 ID",
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
            indexes: [
                {
                    unique: true,
                    fields: ["member_id", "group_id"],
                },
            ],
        },
    );
}
