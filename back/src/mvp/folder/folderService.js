import { Folder } from "../../db";
import { getQueryResultMsg } from "../../middlewares/errorMiddleware";

class folderService {
    static async createFolder({ title, explanation, user_id }) {
        let folder = await Folder.create({ title, explanation, user_id });

        getQueryResultMsg({
            result: typeof folder,
            expectation: "object",
            entity: "폴더",
            queryType: "생성",
        });

        return folder;
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
            return {
                errorMessage: getQueryResultMsg({
                    result: true,
                    expectation: false,
                    entity: "폴더",
                    queryType: "조회",
                }),
            };
        }
    }
}

export { folderService };
