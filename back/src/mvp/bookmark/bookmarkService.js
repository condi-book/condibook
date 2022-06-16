import { Bookmark, Emoji, Keyword, Website, sequelize } from "../../db";
import { getSuccessMsg, getFailMsg } from "../../util/message";

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

    static async getTheBookmark({ id }) {
        try {
            let bookmark = await Bookmark.findOne({
                where: { id },
                include: [
                    {
                        model: Website,
                    },
                ],
                raw: true,
                nest: true,
            });
            if (!bookmark) {
                return getFailMsg({
                    entity: "북마크 상세정보",
                    action: "조회",
                });
            }

            // 키워드 데이터 추가
            const keywords = await Keyword.findAll({
                where: { website_id: bookmark.website_id },
                attributes: ["keyword"],
            });
            bookmark["keyword"] = keywords.map((keyword) => keyword.keyword);

            // 이모지 데이터 추가
            bookmark["emoji"] = await Emoji.findOne({
                where: { website_id: bookmark.website_id },
                attributes: ["emoji"],
            });

            return bookmark;
        } catch (e) {
            return { errorMessage: e };
        }
    }

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
            return bookmarks;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getMyBookmarkCount({ folderIds }) {
        try {
            const result = await Bookmark.count({
                where: { folder_id: folderIds },
            }); // 폴더 id 중 하나라도 맞다면 (배열로 in 연산자 사용) 반환
            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async updateBookmarkFavorites({ id }) {
        try {
            const [results, metadata] = await sequelize.query(
                `UPDATE ${Bookmark.tableName} SET favorites = NOT favorites WHERE id = ${id}`,
            );

            if (metadata.affectedRows === 0) {
                return getFailMsg({
                    entity: "북마크 즐겨찾기",
                    action: "수정",
                });
            }
            return getSuccessMsg({ entity: "북마크 즐겨찾기", action: "수정" });
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteBookmark({ id }) {
        try {
            const result = await Bookmark.destroy({ where: { id } });

            if (result === 0) {
                return getFailMsg({ entity: "북마크", action: "삭제" });
            }
            return getSuccessMsg({ entity: "북마크", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { bookmarkService };
