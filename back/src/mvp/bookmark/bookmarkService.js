import { Bookmark, Website, Folder, User } from "../../db";
import { getSuccessMsg, getFailMsg } from "../../util/message";

class bookmarkService {
    static async createBookmark({ folder_id, website_id, requester_id }) {
        try {
            // 존재하는 사용자인지 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 존재하는 웹사이트인지 확인
            const website = await Website.findOne({ website_id });
            if (!website) {
                return getFailMsg({ entity: "웹사이트", action: "조회" });
            }
            // 존재하는 폴더인지 확인
            const folder = await Folder.findOne({ folder_id });
            if (!folder) {
                return getFailMsg({ entity: "폴더", action: "조회" });
            }
            // 존재하는 북마크인지 확인
            const previousBookmark = await Bookmark.finidAll({
                folder_id: folder.id,
                website_id: website.id,
            });
            if (previousBookmark.length > 0) {
                return { errorMessage: "이미 존재한 북마크입니다." };
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
            const bookmark = await Bookmark.findOne({ bookmark_id });
            if (!bookmark) {
                return getFailMsg({ entity: "북마크", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 북마크 상세 정보 조회
            let bookmarks =
                await Bookmark.findOneWithWebsiteFavoriteByBookmarkId({
                    bookmark_id: bookmark.id,
                    user_id: requester.id,
                });
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
            let bookmark = await Bookmark.findOneWithWebsite({ folder_id });

            return bookmark ? bookmark.website.url : null;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getBookmarksInFolder({ folder_id, requester_id }) {
        try {
            // 폴더 존재 확인
            const folder = await Folder.findOne({ folder_id });
            if (!folder) {
                return getFailMsg({ entity: "폴더", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 북마크 조회
            let bookmarks = await Bookmark.findAllWithWebsite({
                folder_id: folder.id,
            });
            bookmarks = bookmarks.map((bookmark) => {
                const result = {
                    ...bookmark,
                    favorites: bookmark.bmfavorites.id === null ? false : true,
                };
                delete result["bmfavorites"];
                result.website.keywords = result.website.keywords?.keyword;
                return result;
            });
            return bookmarks;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async getBookmarkCountInFolders({ folder_ids }) {
        try {
            const result = await Bookmark.countAllInFolders({ folder_ids });
            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async updateBookmarkOrder({ folder_id, requester_id, bookmarks }) {
        try {
            // 존재하는 사용자인지 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 존재하는 폴더인지 확인
            const folder = await Folder.findOne({ folder_id });
            if (!folder) {
                return getFailMsg({ entity: "폴더", action: "조회" });
            }
            // 폴더 내 북마크의 순서 변경
            bookmarks = bookmarks.map((bookmark) => {
                return {
                    id: bookmark.bookmark_id,
                    order_idx: bookmark.order_idx,
                };
            });
            const updatedBookmarks = await Bookmark.bulkUpdateOrderIdx({
                bookmarks,
            });
            return updatedBookmarks;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteBookmark({ bookmark_id, requester_id }) {
        try {
            // 북마크 존재 확인
            const bookmark = await Bookmark.findOne({ bookmark_id });
            if (!bookmark) {
                return getFailMsg({ entity: "북마크", action: "조회" });
            }
            // 요청자 존재 확인
            const requester = await User.findOne({ user_id: requester_id });
            if (!requester) {
                return getFailMsg({ entity: "요청자", action: "조회" });
            }
            // 북마크 소유 여부 확인
            const folder = await Folder.findOne({
                folder_id: bookmark.folder_id,
            });
            if (!folder || folder.user_id !== requester.id) {
                return {
                    errorMessage: "사용자는 북마크를 삭제할 권한이 없습니다.",
                };
            }
            // 북마크 삭제
            const result = await Bookmark.destroyOne({
                bookmark_id: bookmark.id,
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
