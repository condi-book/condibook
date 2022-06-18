import { Membership, sequelize, Team, User } from "../../db";
import { getFailMsg } from "../../util/message";
import { folderService } from "../folder/folderService";
import { bookmarkService } from "../bookmark/bookmarkService";

class teamService {
    static async createTeam({ manager, name, explanation }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ where: { id: manager } });
            if (!user) {
                return getFailMsg({
                    entity: "사용자",
                    action: "조회",
                });
            }

            // 팀 생성
            const newTeam = await Team.create({
                manager: user.id,
                name,
                explanation,
            });

            // 팀의 첫번째 멤버(팀 매니저) 생성
            await Membership.create({
                member_id: user.id,
                team_id: newTeam.id,
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

    static async getTeamInfo({ ids }) {
        try {
            let result = await Team.findOne({
                where: { id: ids },
                include: [User],
                raw: true,
                nest: true,
            });

            if (result.length === 0) {
                return getFailMsg({ entity: "팀 상세정보", action: "조회" });
            } else {
                result.map((team) => {
                    team["manager"] = team["user"];
                    delete team["user"];
                    await folderService.getFolderCntBookmarkCnt({ team_id })
                    return team;
                });
            }


            

            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamList({ user_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }

            // 팀 조회
            const teamIds = await Membership.findAll({
                where: { member_id: user.id },
                attributes: ["team_id"],
                raw: true,
                nest: true,
            });
            const result = await teamService.getTeamInfo;

            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { teamService };
