import { Folder, sequelize } from "../../db";
import { getSuccessMsg, getFailMsg } from "../../util/message";

class folderService {
    static async createFolder({ title, explanation, user_id }) {
        try {
            await Folder.create({ title, explanation, user_id });

            return getSuccessMsg({ entity: "폴더", action: "생성" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getMyFolders({ user_id }) {
        try {
            let folders = await Folder.findAll({
                where: { user_id: user_id },
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

    static async updateFolderInfo({ id, title, explanation }) {
        try {
            const affectedRows = await Folder.update(
                { title, explanation },
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
            const [results, metadata] = await sequelize.query(
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
