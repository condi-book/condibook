import { Folder, sequelize } from "../../db";
import { getSuccessMsg, getFailMsg } from "../../util/message";

class folderService {
    static async createFolder({ title, user_id }) {
        try {
            // 이미 존재하는 폴더인지 확인
            const previous = await Folder.findOne({
                where: { user_id, title },
            });
            if (previous) {
                return previous;
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

    static async updateFolderInfo({ id, title }) {
        try {
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
