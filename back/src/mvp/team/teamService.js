import { sequelize, Team, User } from "../../db";
import { getFailMsg } from "../../util/message";

class teamService {
    static async createTeam({ manager, name, explanation }) {
        try {
            const user = await User.findOne({ where: { id: manager } });
            if (!user) {
                return getFailMsg({
                    entity: "매니저로 지정한 사용자",
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

    static async findTeamAll() {
        try {
            const teams = await Team.findAll({});
            return teams;
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async findTeamByName({ name }) {
        try {
            const [results] = await sequelize.query(
                `SELECT * FROM ${Team.tableName} WHERE name LIKE '%${name}%'`,
            );

            return results;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { teamService };
