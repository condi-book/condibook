import { Bookmark /*Website*/ } from "../../db";
import { getQueryResultMsg } from "../../middlewares/errorMiddleware";

class bookmarkService {
    static async createBookmark({ user_id, website_id, folder_id }) {
        let bookmark = await Bookmark.create({
            user_id,
            website_id,
            folder_id,
        });

        getQueryResultMsg({
            result: typeof bookmark,
            expectation: "object",
            entity: "북마크",
            queryType: "생성",
        });

        return bookmark;
    }

    //======================수정해야함======================
    // static async getTheBookmark({ id }) {
    //     let bookmark = await Bookmark.findByPk(id);

    //     getQueryResultMsg({
    //         result: typeof bookmark,
    //         expectation: "object",
    //         entity: "북마크",
    //         queryType: "조회",
    //     });

    //     return bookmark;
    // }

    // static async getBookmarksInTheFolder({ folder_id }) {
    //     let bookmarks = await Bookmark.findOne({
    //         where: { folder_id },
    //         include: [
    //             { model: Website, required: true, as: Website.tableName },
    //         ],
    //     }); //result.get is not a function 에러 발생....
    //     console.log(JSON.stringify(bookmarks, null, 2));
    //     return bookmarks;
    // }
    //====================================================
}

export { bookmarkService };
