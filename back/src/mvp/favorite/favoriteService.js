import { User, Folder, FDFavorite, Bookmark, BMFavorite } from "../../db";
import { getFailMsg } from "../../util/message";

class favoriteService {
    static async createFolderFavorites({ folder_id, requester_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ user_id: requester_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 폴더 존재 확인
            const folder = await Folder.findOne({ folder_id });
            if (!folder) {
                return getFailMsg({ entity: "폴더", action: "조회" });
            }
            // 폴더 즐겨 찾기 생성
            const [row, created] = await FDFavorite.findOrCreate({
                user_id: user.id,
                folder_id: folder.id,
            });
            if (created === false) {
                return { errorMessage: "이미 등록된 즐겨찾기 입니다." };
            }
            return row;
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async createBookmarkFavorites({ bookmark_id, requester_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ user_id: requester_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 북마크 존재 확인
            const bookmark = await Bookmark.findOne({ bookmark_id });
            if (!bookmark) {
                return getFailMsg({ entity: "북마크", action: "조회" });
            }
            // 북마크 즐겨 찾기 생성
            const [row, created] = await BMFavorite.findOrCreate({
                user_id: user.id,
                bookmark_id: bookmark.id,
            });
            if (created === false) {
                return { errorMessage: "이미 등록된 즐겨찾기 입니다." };
            }
            return row;
        } catch (e) {
            return { errorMessage: e };
        }
    }

    static async deleteFolderFavorites({ folder_id, requester_id }) {
        try {
            // 사용자 존재 확인
            const user = await Folder.findOne({ user_id: requester_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 폴더 즐겨 찾기 삭제
            const deletedRow = await FDFavorite.destroyOne({
                user_id: user.id,
                folder_id,
            });
            if (deletedRow === 0) {
                return getFailMsg({
                    entity: "폴더 즐겨찾기",
                    action: "삭제",
                });
            }
            return deletedRow;
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async deleteBookmarkFavorites({ bookmark_id, requester_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ user_id: requester_id });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 북마크 즐겨 찾기 삭제
            const deletedRow = await BMFavorite.destroyOne({
                user_id: user.id,
                bookmark_id,
            });
            if (deletedRow === 0) {
                return getFailMsg({
                    entity: "북마크 즐겨찾기",
                    action: "삭제",
                });
            }
            return deletedRow;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { favoriteService };
