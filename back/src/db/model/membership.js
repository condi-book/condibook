import {
    FolderModel,
    MembershipModel,
    sequelize,
    TeamModel,
    UserModel,
} from "../schema";

class Membership {
    static create({ member_id, team_id }) {
        return MembershipModel.create({
            member_id: member_id,
            team_id: team_id,
        });
    }
    static findOne({ team_id, member_id }) {
        return MembershipModel.findOne({
            where: { team_id: team_id, member_id: member_id },
        });
    }
    static count({ member_id, team_id }) {
        return MembershipModel.count({
            where: { member_id: member_id, team_id: team_id },
        });
    }
    static findAllMemberWithUserByTeamId({ team_id }) {
        return sequelize.query(
            `SELECT user.id AS user_id, user.nickname, user.email, user.image_url, user.intro
            FROM (SELECT * FROM ${MembershipModel.tableName} WHERE ${MembershipModel.tableName}.team_id = ${team_id}) as membership
            INNER JOIN ${UserModel.tableName} as user
            ON membership.member_id = user.id`,
            { type: sequelize.QueryTypes.SELECT },
        );
    }
    static findAllTeamWithTeamByUserId({ user_id }) {
        return sequelize.query(
            `SELECT membership.team_id, team.name, team.explanation, count(folder.id) as folder_count
            FROM (SELECT * FROM ${MembershipModel.tableName} WHERE ${MembershipModel.tableName}.member_id = ${user_id}) as membership
            INNER JOIN ${TeamModel.tableName} AS team
            ON membership.team_id = team.id
            LEFT JOIN ${FolderModel.tableName} as folder
            ON team.id = folder.team_id
            GROUP BY team.id, membership.createdAt
            ORDER BY membership.createdAt DESC;`,
            { type: sequelize.QueryTypes.SELECT },
        );
    }
    static destroyOne({ team_id, member_id }) {
        return MembershipModel.destroy({
            where: { team_id: team_id, member_id: member_id },
        });
    }
}

export { Membership };
