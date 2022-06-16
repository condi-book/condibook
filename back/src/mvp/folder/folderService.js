import { Folder } from "../../db";
import { getQueryResultMsg } from "../../middlewares/errorMiddleware";

class folderService {
    static async createFolder({ title, explanation }) {
        let folder = await Folder.create({ title, explanation });

        getQueryResultMsg({
            result: typeof folder,
            expectation: "object",
            entity: "폴더",
            queryType: "생성",
        });

        return folder;
    }
}

export { folderService };
