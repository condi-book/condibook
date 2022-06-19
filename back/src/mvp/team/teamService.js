import { Membership, Team, User, Op } from "../../db";
import { getFailMsg } from "../../util/message";
import { folderService } from "../folder/folderService";

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

    static async createMembership({ hostId, inviteeId, teamId }) {
        try {
            // 초대한 사람, 초대받은 사람 존재 확인
            const host = await User.findOne({ where: { id: hostId } });
            if (!host) {
                return getFailMsg({ entity: "초대한 사용자", action: "조회" });
            }
            const invitee = await User.findOne({
                where: { id: inviteeId },
            });
            if (!invitee) {
                return getFailMsg({
                    entity: "초대받은 사용자",
                    action: "조회",
                });
            }

            // 멤버 추가 권한 확인
            const team = await Team.findOne({ where: { id: teamId } });
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
            const teams = await Team.findAll({});
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

    static async getTeamsInfo({ ids }) {
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
                result.map(async (team) => {
                    team["manager"] = team["user"];
                    delete team["user"];
                    await folderService.getFolderCntBookmarkCnt({ team_id });
                    return team;
                });
            }

            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamListUserJoined({ user_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }

            // 사용자가 속한 팀 조회
            let teams = await Membership.findAll({
                where: { member_id: user.id },
                attributes: ["team_id"],
                include: [Team],
                raw: true,
                nest: true,
            });
            teams = teams.map((team) => {
                return team["team"];
            }); // [{"team_id": 1, "team": { 팀 정보 }}]로 반환되서 정리가 필요함

            return teams;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { teamService };
