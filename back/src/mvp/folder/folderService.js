import {
    Folder,
    Membership,
    sequelize,
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
            const user = await User.findOne({ where: { id: requester_id } });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }

            // 새 폴더 생성
            const newFolder = await Folder.create({
                user_id: user.id,
                title,
            });

            return newFolder;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async createFolderForTeam({ team_id, title, requester_id }) {
        try {
            // 사용자의 팀 소속 여부 확인
            const member = await Membership.findOne({
                where: { team_id, member_id: requester_id },
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

    static async getUserFolders({ user_id }) {
        try {
            let folders = await sequelize.query(
                `SELECT folder.id, folder.title, folder.createdAt, folder.updatedAt, count(bookmark.id) as bookmark_count, CASE WHEN fdfavorite.id IS NULL THEN false ELSE true END favorites
                FROM (SELECT * FROM ${Folder.tableName} WHERE ${Folder.tableName}.user_id = ${user_id}) AS folder 
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

    static async getMyFolderIds({ user_id }) {
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

    static async getTeamFolderIds({ team_id }) {
        try {
            let ids = await Folder.findAll({
                where: { team_id },
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

    static async getFolderCntBookmarkCnt({ team_id }) {
        try {
            let result = {};

            // 폴더 갯수
            const folderIds = await folderService.getTeamFolderIds({
                team_id,
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
                    folderIds: [folder.id],
                });

            return folder;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async updateTitle({ id, title, user_id }) {
        try {
            // 사용자의 폴더 소유 여부 확인
            const folder = await Folder.findOne({ where: { id, user_id } });
            if (!folder) {
                return getFailMsg({
                    entity: "해당 사용자의 폴더",
                    action: "조회",
                });
            }

            const affectedRows = await Folder.update(
                { title },
                { where: { id: id } },
            );

            if (affectedRows[0] === 0) {
                return getFailMsg({ entity: "폴더 정보", action: "수정" });
            }
            return getSuccessMsg({ entity: "폴더 정보", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async updateFolderFavorites({ id }) {
        try {
            const [metadata] = await sequelize.query(
                `UPDATE folders SET favorites = NOT favorites WHERE id = ${id}`,
            );

            if (metadata.affectedRows === 0) {
                return getFailMsg({ entity: "폴더 즐겨찾기", action: "수정" });
            }
            return getSuccessMsg({ entity: "폴더 즐겨찾기", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteFolder({ id, user_id }) {
        try {
            // 사용자의 폴더 소유 여부 확인
            const folder = await Folder.findOne({ where: { id, user_id } });
            if (!folder) {
                return getFailMsg({
                    entity: "해당 사용자의 폴더",
                    action: "조회",
                });
            }

            const result = await Folder.destroy({ where: { id, user_id } });

            if (result === 0) {
                return getFailMsg({ entity: "폴더", action: "삭제" });
            }
            return getSuccessMsg({ entity: "폴더", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { folderService };
