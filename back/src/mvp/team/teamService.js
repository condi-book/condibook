import { sequelize, Team, User } from "../../db";
import { getFailMsg } from "../../util/message";

class teamService {
    static async createTeam({ manager, name, explanation }) {
        try {
            const user = await User.findOne({ where: { id: manager } });
            if (!user) {
                return getFailMsg({
                    entity: "사용자",
                    action: "조회",
                });
            }

            const newTeam = await Team.create({
                manager: user.id,
                name,
                explanation,
            });

            return newTeam;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamAll() {
        try {
            const teams = await Team.findAll({});
            return teams;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamByName({ name }) {
        try {
            const [results] = await sequelize.query(
                `SELECT * FROM ${Team.tableName} WHERE name LIKE '%${name}%'`,
            );

            return results;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamInfo({ id }) {
        try {
            const result = await Team.findOne({
                where: { id },
                include: [User],
                raw: true,
                nest: true,
            });
            if (!result) {
                return getFailMsg({ entity: "팀 상세정보", action: "조회" });
            }
            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { teamService };
