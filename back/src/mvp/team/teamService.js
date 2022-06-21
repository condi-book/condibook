import {
    Membership,
    Team,
    User,
    Folder,
    Bookmark,
    FDFavorite,
    Op,
    sequelize,
} from "../../db";
import { getFailMsg, getSuccessMsg } from "../../util/message";
import { bookmarkService } from "../bookmark/bookmarkService";

class teamService {
    static async createTeam({ manager_id, name, explanation }) {
        try {
            // 사용자 존재 확인
            const manager = await User.findOne({ where: { id: manager_id } });
            if (!manager) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }

            // 팀 생성
            const newTeam = await Team.create({
                manager: manager.id,
                name,
                explanation,
            });

            // 팀의 첫번째 멤버(팀 매니저) 생성
            await Membership.create({
                member_id: manager.id,
                team_id: newTeam.id,
            });

            return newTeam;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async createMembership({ host_id, invitee_id, team_id }) {
        try {
            // 초대한 사람, 초대받은 사람 존재 확인
            const host = await User.findOne({ where: { id: host_id } });
            if (!host) {
                return getFailMsg({ entity: "초대한 사용자", action: "조회" });
            }
            const invitee = await User.findOne({ where: { id: invitee_id } });
            if (!invitee) {
                return getFailMsg({
                    entity: "초대받은 사용자",
                    action: "조회",
                });
            }
            // 멤버를 초대할 권한 확인
            const team = await Team.findOne({ where: { id: team_id } });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            if (team.manager !== host.id) {
                return {
                    errorMessage: "현재 사용자는 팀에 초대할 권한이 없습니다.",
                };
            }
            // 이미 회원인지 존재 확인
            const previousMembership = await Membership.count({
                where: { member_id: invitee.id, team_id: team.id },
            });
            if (previousMembership > 0) {
                return { errorMessage: "이미 소속된 회원입니다." };
            }
            // 멤버 추가
            const membership = await Membership.create({
                member_id: invitee.id,
                team_id: team.id,
            });

            return membership;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamAll() {
        try {
            const teams = await sequelize.query(
                `SELECT team.id as team_id, team.name, team.explanation, count(folder.id) as folder_count
            FROM ${Team.tableName} AS team
                LEFT JOIN ${Folder.tableName} as folder
                ON team.id = folder.team_id
            GROUP BY team.id;`,
                { type: sequelize.QueryTypes.SELECT },
            );

            return teams;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async searchTeam({ keyword }) {
        try {
            const results = await Team.findAll({
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${keyword}%`,
                            },
                        },
                        {
                            explanation: {
                                [Op.like]: `%${keyword}%`,
                            },
                        },
                    ],
                },
            });

            return results;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamMembers({ team_id }) {
        try {
            // 팀 존재 확인
            const team = await Team.findOne({ where: { id: team_id } });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 팀 멤버 조회
            const members = await sequelize.query(
                `SELECT user.id, user.nickname, user.email, user.image_url, user.intro
                FROM (SELECT * FROM ${Membership.tableName} WHERE ${Membership.tableName}.team_id = ${team_id}) as membership
                INNER JOIN ${User.tableName} as user
                ON membership.member_id = user.id`,
                { type: sequelize.QueryTypes.SELECT },
            );
            return members;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamInfoUserJoined({ user_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }

            // 사용자가 속한 팀 조회
            let teams = await sequelize.query(
                `SELECT membership.team_id, team.name, team.explanation, count(folder.id) as folder_count
                FROM (SELECT * FROM ${Membership.tableName} WHERE ${Membership.tableName}.member_id = ${user_id}) as membership
                INNER JOIN ${Team.tableName} AS team
                ON membership.team_id = team.id
                LEFT JOIN ${Folder.tableName} as folder
                ON team.id = folder.team_id
                GROUP BY team.id
                ORDER BY membership.createdAt DESC;`,
                { type: sequelize.QueryTypes.SELECT },
            );

            return teams;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamFolders({ team_id, requester_id }) {
        try {
            // 팀 존재 확인
            const team = await Team.findOne({ where: { id: team_id } });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 팀 폴더 확인
            let folders = await sequelize.query(
                `SELECT folder.id, folder.title, folder.createdAt, folder.updatedAt, count(bookmark.id) as bookmark_count, CASE WHEN fdfavorite.id IS NULL THEN false ELSE true END favorites
                FROM (SELECT * FROM ${Folder.tableName} WHERE ${Folder.tableName}.team_id = ${team.id}) AS folder
                LEFT JOIN ${Bookmark.tableName} AS bookmark
                ON folder.id = bookmark.folder_id
                LEFT JOIN ${FDFavorite.tableName} AS fdfavorite
                ON folder.id = fdfavorite.folder_id and fdfavorite.user_id = ${requester.id}
                GROUP BY folder.id
                ORDER BY fdfavorite.createdAt DESC, folder.createdAt ASC;`,
                { type: sequelize.QueryTypes.SELECT },
            );

            folders = await Promise.all(
                folders.map(async (folder) => {
                    // 폴더 이미지를 위해서 북마크 정보 한개만 추가
                    const url =
                        await bookmarkService.getFirstBookmarkUrlInFolder({
                            folder_id: folder.id,
                        });
                    return {
                        ...folder,
                        favorites: folder.favorites === 1 ? true : false,
                        first_bookmark_url: url,
                    };
                }),
            );

            return folders;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async updateTeamInfo({ team_id, requester_id, name, explanation }) {
        try {
            // 팀 아이디가 실제로 존재하는지
            const team = await Team.findOne({ where: { id: team_id } });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 수정 요청자 requester가 실제로 존재하는지, 그리고 수정할 권한이 있는지
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            if (team.manager !== requester.id) {
                return { errorMessage: "사용자는 권한이 없습니다." };
            }
            //팀 상세정보 수정
            const [affectedRows] = await Team.update(
                { name, explanation },
                { where: { id: team.id, manager: requester.id } },
            );
            if (affectedRows === 0) {
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "팀 상세정보", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteMemeber({ team_id, member_id, requester_id }) {
        try {
            // 팀 존재 확인
            const team = await Team.findOne({ where: { id: team_id } });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 삭제 요청자 존재 확인 및 권한 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            if (team.manager !== requester.id) {
                return { errorMessage: "사용자는 권한이 없습니다." };
            }
            // 사용자 존재 확인 및 소속 여부
            const member = await User.findOne({ where: { id: member_id } });
            if (!member) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            const membership = await Membership.findOne({
                where: { member_id: member.id, team_id: team.id },
            });
            if (!membership) {
                return getFailMsg({ entity: "멤버십", action: "조회" });
            }
            // 회원 삭제
            const result = await Membership.destroy({
                where: { team_id: team.id, member_id: member.id },
            });
            if (result === 0) {
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "회원", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteTeam({ team_id, requester_id }) {
        try {
            // 팀 존재 확인
            const team = await Team.findOne({ where: { id: team_id } });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 삭제 요청자 존재 확인 및 권한 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            if (team.manager !== requester.id) {
                return { errorMessage: "사용자는 권한이 없습니다." };
            }
            // 팀 삭제
            const result = await Team.destroy({
                where: { id: team.id },
            });
            if (result === 0) {
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "회원", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { teamService };
