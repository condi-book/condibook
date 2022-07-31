import { Membership, Team, User, Folder } from "../../db";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import { getFailMsg, getSuccessMsg } from "../../util/message";
import { bookmarkService } from "../bookmark/bookmarkService";

class teamService {
    static async createTeam({ manager_id, name, explanation }) {
        try {
            // 사용자 존재 확인
            const manager = await User.findOne({ user_id: manager_id });
            if (!manager) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 팀 생성
            const newTeam = await Team.create({
                manager_id: manager.id,
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

    static async createMemberShipJWT({ host_id, invitee_id, team_id }) {
        try {
            // 초대한 사람, 초대받은 사람 존재 확인
            const host = await User.findOne({ user_id: host_id });
            if (!host) {
                return getFailMsg({ entity: "초대한 사용자", action: "조회" });
            }
            const invitee = await User.findOne({ user_id: invitee_id });
            if (!invitee) {
                return getFailMsg({
                    entity: "초대받은 사용자",
                    action: "조회",
                });
            }
            // 멤버를 초대할 권한 확인
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            } else if (team.manager !== host.id) {
                return {
                    errorMessage: "현재 사용자는 팀에 초대할 권한이 없습니다.",
                };
            }
            // 이미 회원인지 존재 확인
            const previousMembership = await Membership.count({
                member_id: invitee.id,
                team_id: team.id,
            });
            if (previousMembership > 0) {
                return { errorMessage: "이미 소속된 회원입니다." };
            }
            const payload = {
                invitee_id: invitee.id,
                team_id: team.id,
            };
            const options = {
                expiresIn: "1d",
            };
            const token = jwt.sign(payload, JWT_SECRET_KEY, options);
            return token;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async createMembership({ current_user_id, token }) {
        try {
            // 현재 로그인 한 사람과 초대한 사람의 일치 여부 확인
            const currentUser = await User.findOne({
                user_id: current_user_id,
            });
            if (!currentUser) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            const invitee_id = payload.invitee_id;
            const team_id = payload.team_id;
            const invitee = await User.findOne({ user_id: invitee_id });
            if (!invitee) {
                return getFailMsg({
                    entity: "초대받은 사용자",
                    action: "조회",
                });
            }
            if (currentUser.id !== invitee.id) {
                return { errorMessage: "초대받은 해당 유저가 아닙니다." };
            }
            // 팀 존재 여부 확인
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 이미 회원인지 존재 확인
            const previousMembership = await Membership.count({
                member_id: invitee.id,
                team_id: team.id,
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
            const teams = await Team.findAllWithFolderCnt();

            return teams;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async searchTeam({ keyword }) {
        try {
            const results = await Team.findAllByNameExplanation({ keyword });

            return results;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamMembers({ team_id }) {
        try {
            // 팀 존재 확인
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 팀 멤버 조회
            const members = await Membership.findAllMemberWithUserByTeamId({
                team_id: team.id,
            });
            return members;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamInfoUserJoined({ user_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ user_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 사용자가 속한 팀 조회
            let teams = await Membership.findAllTeamWithTeamByUserId({
                user_id: user.id,
            });

            return teams;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getTeamFolders({ team_id, requester_id }) {
        try {
            // 팀 존재 확인
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 팀 소속 확인
            const membership = await Membership.findOne({
                team_id: team.id,
                member_id: requester.id,
            });
            if (!membership) {
                return getFailMsg({ entity: "멤버십", action: "조회" });
            }
            // 팀 폴더 확인
            let folders =
                await Folder.findAllWithBookmarkFDFavoriteByTeamIdUserId({
                    team_id: team.id,
                    user_id: requester.id,
                });

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
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 수정 요청자 requester가 실제로 존재하는지, 그리고 수정할 권한이 있는지
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            } else if (team.manager !== requester.id) {
                return { errorMessage: "사용자는 권한이 없습니다." };
            }
            //팀 상세정보 수정
            const [affectedRows] = await Team.updateInfo({
                team_id: team.id,
                manager_id: requester.id,
                name,
                explanation,
            });
            if (affectedRows === 0) {
                throw new Error("SL: 팀 상세정보 수정 실패");
            }
            return getSuccessMsg({ entity: "팀 상세정보", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteMemeber({ team_id, member_id, requester_id }) {
        try {
            // 팀 존재 확인
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 삭제 요청자 존재 확인 및 권한 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            } else if (team.manager !== requester.id) {
                return { errorMessage: "사용자는 권한이 없습니다." };
            }
            // 사용자 존재 확인 및 소속 여부
            const member = await User.findOne({ user_id: member_id });
            if (!member) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            const membership = await Membership.findOne({
                team_id: team.id,
                member_id: member.id,
            });
            if (!membership) {
                return getFailMsg({ entity: "멤버십", action: "조회" });
            }
            // 회원 삭제
            const result = await Membership.destroyOne({
                team_id: team.id,
                member_id: member.id,
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
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 삭제 요청자 존재 확인 및 권한 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            } else if (team.manager !== requester.id) {
                return { errorMessage: "사용자는 권한이 없습니다." };
            }
            // 팀 삭제
            const result = await Team.destroyOne({ team_id: team.id });
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
