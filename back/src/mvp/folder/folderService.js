import {
    Folder,
    Membership,
    sequelize,
    Team,
    User,
    Bookmark,
    FDFavorite,
} from "../../db";
import { bookmarkService } from "../bookmark/bookmarkService";
import { getSuccessMsg, getFailMsg } from "../../util/message";

class folderService {
    static async createFolderForUser({ requester_id, title }) {
        try {
            // 존재하는 사용자인지 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 새 폴더 생성
            const newFolder = await Folder.create({
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
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 존재하는 팀인지 확인
            const team = await Team.findOne({
                where: { id: team_id },
            });
            if (!team) {
                return getFailMsg({ entity: "팀", action: "조회" });
            }
            // 사용자의 팀 소속 여부 확인
            const member = await Membership.findOne({
                where: { team_id: team.id, member_id: requester.id },
            });
            if (!member) {
                return getFailMsg({
                    entity: "사용자가 팀에 속해 있는지",
                    action: "확인",
                });
            }
            // 새 폴더 생성
            const newFolder = await Folder.create({
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
            let folder = await Folder.findOne({
                where: { id: folder_id },
                attributes: ["id", "title"],
            });
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
            const user = await User.findOne({
                where: { id: user_id },
            });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 폴더 조회
            let folders = await sequelize.query(
                `SELECT folder.id, folder.title, folder.createdAt, folder.updatedAt, count(bookmark.id) as bookmark_count, CASE WHEN fdfavorite.id IS NULL THEN false ELSE true END favorites
                FROM (SELECT * FROM ${Folder.tableName} WHERE ${Folder.tableName}.user_id = ${user.id}) AS folder
                LEFT JOIN ${Bookmark.tableName} AS bookmark
                ON folder.id = bookmark.folder_id
                LEFT JOIN ${FDFavorite.tableName} AS fdfavorite
                ON folder.id = fdfavorite.folder_id
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

    static async getUserFolderIds({ user_id }) {
        try {
            let ids = await Folder.findAll({
                where: { user_id },
                attributes: ["id"],
                raw: true,
            });
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
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 사용자의 폴더 소유 여부 확인
            const folder = await Folder.findOne({
                where: { id: folder_id, user_id: requester.id },
            });
            if (!folder) {
                return getFailMsg({
                    entity: "해당 사용자의 폴더",
                    action: "조회",
                });
            }
            // 폴더 상세 정보 수정
            const affectedRows = await Folder.update(
                { title },
                { where: { id: folder.id } },
            );
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
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 사용자의 폴더 소유 여부 확인
            const folder = await Folder.findOne({
                where: { id: folder_id, user_id: requester.id },
            });
            if (!folder) {
                return getFailMsg({
                    entity: "사용자의 폴더",
                    action: "조회",
                });
            }
            // 폴더 삭제
            const result = await Folder.destroy({
                where: { id: folder.id, user_id: requester.id },
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
