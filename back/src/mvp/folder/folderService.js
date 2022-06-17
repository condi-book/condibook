import { Folder, Membership, sequelize, User } from "../../db";
import { bookmarkService } from "../bookmark/bookmarkService";
import { getSuccessMsg, getFailMsg } from "../../util/message";

class folderService {
    static async createFolderForUser({ user_id, title }) {
        try {
            // 존재하는 사용자인지 확인
            const user = await User.findOne({ where: { id: user_id } });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }

            // 새 폴더 생성
            const newFolder = await Folder.create({
                user_id,
                title,
            });

            return newFolder;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async createFolderForTeam({ team_id, title, user_id }) {
        try {
            // 사용자의 팀 소속 여부 확인
            const member = await Membership.findOne({
                where: { team_id, member_id: user_id },
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

    static async getMyFolders({ user_id }) {
        try {
            let folders = await Folder.findAll({
                where: { user_id },
            });

            const result = folders.map((folder) => {
                return {
                    ...folder,
                    favorites: folder.favorites == 1 ? true : false,
                };
            });
            return result;
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

    static async getFolderInfo({ id }) {
        try {
            let info = await Folder.findOne({
                where: { id },
                attributes: ["id", "title"],
            });
            if (!info) {
                return getFailMsg({ entity: "폴더 상세정보", action: "조회" });
            }

            // 폴더에 속한 북마크 개수
            info["bookmarkCount"] =
                await bookmarkService.getBookmarkCountInFolders({
                    folderIds: [id],
                });

            return info;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async updateFolderInfo({ id, title, user_id }) {
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
