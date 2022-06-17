import { Membership, sequelize, Team, User } from "../../db";
import { getFailMsg } from "../../util/message";
import { folderService } from "../folder/folderService";
import { bookmarkService } from "../bookmark/bookmarkService";

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
            } else {
                result["manager"] = result["user"];
                delete result["user"];
            }

            // 폴더 갯수
            const folderIds = await folderService.getTeamFolderIds({
                team_id: id,
            });
            result["folderCount"] = folderIds.length;

            // 북마크 갯수
            let bookmarkCount = 0;
            if (folderIds.length > 0) {
                bookmarkCount = await bookmarkService.getMyBookmarkCount({
                    folderIds: folderIds,
                });
            }
            result["bookmarkCount"] = bookmarkCount;

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
            const result = await Membership.findAll({
                where: { member_id: user.id },
                include: [Team],
            });

            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { teamService };
