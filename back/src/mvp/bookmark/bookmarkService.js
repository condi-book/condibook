import { Bookmark, Emoji, Keyword, Website } from "../../db";

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
    //====================================================

    static async getBookmarksInTheFolder({ folder_id }) {
        try {
            let bookmarks = await Bookmark.findAll({
                where: { folder_id },
                include: [
                    {
                        model: Website,
                        // include: [
                        //     {
                        //         model: Keyword,
                        //         attributes: ["keyword", "website_id"],
                        //         group: ["website_id"],
                        //     },
                        //     {
                        //         model: Emoji,
                        //         required: true,
                        //         attributes: ["emoji"],
                        //     },
                        // ],
                    },
                ],
                raw: true,
                nest: true,
            });
            bookmarks = await Promise.all(
                bookmarks.map(async (bookmark) => {
                    // 키워드 데이터 추가
                    const keywords = await Keyword.findAll({
                        where: { website_id: bookmark.website_id },
                        attributes: ["keyword"],
                    });
                    bookmark["keyword"] = keywords.map((item) => item.keyword);

                    // 이모지 데이터 추가
                    bookmark["emoji"] = await Emoji.findOne({
                        where: { website_id: bookmark.website_id },
                        attributes: ["emoji"],
                    });

                    return bookmark;
                }),
            );
            console.log(bookmarks);
            return bookmarks;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { bookmarkService };
