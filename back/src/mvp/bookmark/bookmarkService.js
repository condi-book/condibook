import { Bookmark } from "../../db";

class bookmarkService {
    static async createBookmark({ website_id, folder_id }) {
        try {
            // DB에 이미 존재하는 북마크인지 확인
            const previous = await Bookmark.findOne({
                where: {
                    website_id,
                    folder_id,
                },
            });
            if (previous) {
                return previous;
            }

            let bookmark = await Bookmark.create({
                website_id,
                folder_id,
            });

            return bookmark;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    //======================수정해야함======================
    // static async getTheBookmark({ id }) {
    //     let bookmark = await Bookmark.findByPk(id);

    //

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
