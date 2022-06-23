import {
    Bookmark,
    Emoji,
    Keyword,
    Website,
    sequelize,
    Folder,
    User,
    BMFavorite,
} from "../../db";
import { getSuccessMsg, getFailMsg } from "../../util/message";

class bookmarkService {
    static async createBookmark({ folder_id, website_id, requester_id }) {
        try {
            // 존재하는 사용자인지 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 존재하는 웹사이트인지 확인
            const website = await Website.findOne({
                where: { id: website_id },
            });
            if (!website) {
                return getFailMsg({ entity: "웹사이트", action: "조회" });
            }
            // 존재하는 폴더인지 확인
            const folder = await Folder.findOne({
                where: { id: folder_id },
            });
            if (!folder) {
                return getFailMsg({ entity: "폴더", action: "조회" });
            }
            // 북마크 생성
            let bookmark = await Bookmark.create({
                website_id: website.id,
                folder_id: folder.id,
            });

            return bookmark;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getBookmark({ bookmark_id, requester_id }) {
        try {
            // 북마크 존재 확인
            const bookmark = await Bookmark.findOne({
                where: { id: bookmark_id },
            });
            if (!bookmark) {
                return getFailMsg({ entity: "북마크", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 북마크 상세 정보 조회
            let bookmarks = await sequelize.query(
                `SELECT bookmark.id AS bookmark_id, website.id AS website_id, website.url AS website_url, 
                    website.meta_title, website.meta_description, emoji.emoji as emoji, GROUP_CONCAT(keyword.keyword SEPARATOR ',') AS keywords
                    , CASE WHEN bmfavorite.id IS NULL THEN false ELSE true END favorites
                FROM (SELECT * FROM ${Bookmark.tableName} WHERE ${Bookmark.tableName}.id = ${bookmark.id}) AS bookmark
                    INNER JOIN ${Website.tableName} AS website 
                    ON bookmark.website_id = website.id
                    LEFT JOIN ${Emoji.tableName} AS emoji 
                    ON emoji.website_id = website.id
                    INNER JOIN ${Keyword.tableName} AS keyword 
                    ON keyword.website_id = website.id
                    LEFT JOIN ${BMFavorite.tableName} AS bmfavorite
                    ON bookmark.id = bmfavorite.bookmark_id and bmfavorite.user_id = ${requester.id};`,
                { type: sequelize.QueryTypes.SELECT },
            );
            bookmarks = bookmarks.map((bookmark) => {
                return {
                    ...bookmark,
                    favorites: bookmark.favorites === 1 ? true : false,
                };
            });

            return bookmarks;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getFirstBookmarkUrlInFolder({ folder_id }) {
        try {
            let bookmark = await Bookmark.findOne({
                where: { folder_id },
                include: [Website],
                raw: true,
                nest: true,
            });

            return bookmark ? bookmark.website.url : null;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getBookmarksInFolder({ folder_id, requester_id }) {
        try {
            // 폴더 존재 확인
            const folder = await Folder.findOne({ where: { id: folder_id } });
            if (!folder) {
                return getFailMsg({ entity: "폴더", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 북마크 조회
            let bookmarks = await Bookmark.findAll({
                where: { folder_id: folder.id },
                attributes: ["id", "createdAt", "updatedAt"],
                include: [
                    {
                        model: Website,
                        required: true,
                        include: [
                            { model: Keyword, attributes: ["keyword"] },
                            { model: Emoji, attributes: ["emoji"] },
                        ],
                    },
                    { model: BMFavorite },
                ],
                nest: true,
                raw: true,
            });
            bookmarks = bookmarks.map((bookmark) => {
                const result = {
                    ...bookmark,
                    favorites: bookmark.bmfavorites.id === null ? false : true,
                };
                delete result["bmfavorites"];
                return result;
            });
            return bookmarks;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getBookmarkCountInFolders({ folder_ids }) {
        try {
            const result = await Bookmark.count({
                where: { folder_id: folder_ids },
            }); // 폴더 id 중 하나라도 맞다면 (배열로 in 연산자 사용) 반환
            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteBookmark({ bookmark_id, requester_id }) {
        try {
            // 북마크 존재 확인
            const bookmark = await Bookmark.findOne({
                where: { id: bookmark_id },
            });
            if (!bookmark) {
                return getFailMsg({ entity: "북마크", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({
                where: { id: requester_id },
            });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 북마크 삭제
            const result = await Bookmark.destroy({
                where: { id: bookmark.id, user_id: requester.id },
            });

            if (result === 0) {
                // 서버에러
                return { errorMessage: "서버에러" };
            }
            return getSuccessMsg({ entity: "북마크", action: "삭제" });
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { bookmarkService };
