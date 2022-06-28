import { Folder, Membership, Team, User } from "../../db";
import { bookmarkService } from "../bookmark/bookmarkService";
import { getSuccessMsg, getFailMsg } from "../../util/message";

class folderService {
    static async createFolderForUser({ requester_id, title }) {
        try {
            // 존재하는 사용자인지 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 새 폴더 생성
            const newFolder = await Folder.createForUser({
                user_id: requester.id,
                title,
            });
            return newFolder;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async createFolderForTeam({ requester_id, team_id, title }) {
        try {
            // 존재하는 사용자인지 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 존재하는 팀인지 확인
            const team = await Team.findOne({ team_id });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 사용자의 팀 소속 여부 확인
            const member = await Membership.findOne({
                team_id: team.id,
                member_id: requester.id,
            });
            if (!member) {
                return getFailMsg({
                    entity: "사용자가 팀에 속해 있는지",
                    action: "확인",
                });
            }
            // 새 폴더 생성
            const newFolder = await Folder.createForTeam({
                team_id,
                title,
            });
            return newFolder;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getFolderInfo({ folder_id }) {
        try {
            let folder = await Folder.findOneOnlyIdTitle({ folder_id });
            if (!folder) {
                return getFailMsg({ entity: "폴더 상세정보", action: "조회" });
            }
            // 폴더에 속한 북마크 개수
            folder["bookmarkCount"] =
                await bookmarkService.getBookmarkCountInFolders({
                    folder_ids: [folder.id],
                });
            return folder;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getUserFolders({ user_id }) {
        try {
            // 존재하는 사용자인지 확인
            const user = await User.findOne({ user_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 폴더 조회
            let folders = await Folder.findAllWithBookmarkFDFavorite({
                user_id: user.id,
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

    static async getUserFoldersInfo({ user_id }) {
        try {
            // 존재하는 사용자인지 확인
            const user = await User.findOne({ user_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 폴더 조회
            let folders = await Folder.findAllOnlyIdTitle({ user_id: user.id });
            return folders;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getUserFolderIds({ user_id }) {
        try {
            let ids = await Folder.findAllOnlyId({ user_id });
            // 배열 안에 {id: 2}형태로 반환하기 때문에 추가 처리 부분 필요
            ids = ids.map((item) => item.id);
            return ids;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async updateTitle({ folder_id, title, requester_id }) {
        try {
            // 요청자 존재 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 사용자의 폴더 소유 여부 확인
            const folder = await Folder.findOne({
                folder_id: folder_id,
                user_id: requester.id,
            });
            if (!folder) {
                return getFailMsg({
                    entity: "해당 사용자의 폴더",
                    action: "조회",
                });
            }
            // 폴더 상세 정보 수정
            const affectedRows = await Folder.updateTitle({
                folder_id: folder.id,
                title,
            });
            if (affectedRows[0] === 0) {
                // 서버 에러
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "폴더 정보", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteFolder({ folder_id, requester_id }) {
        try {
            // 요청자 존재 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 사용자의 폴더 소유 여부 확인
            const folder = await Folder.findOneByFolderIdUserId({
                folder_id,
                user_id: requester.id,
            });
            if (!folder) {
                return getFailMsg({
                    entity: "사용자의 폴더",
                    action: "조회",
                });
            }
            // 폴더 삭제
            const result = await Folder.destroyOne({
                folder_id: folder.id,
                user_id: requester.id,
            });
            if (result === 0) {
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "폴더", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { folderService };
