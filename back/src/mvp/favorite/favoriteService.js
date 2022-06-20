import { User, Folder, FDFavorite, Bookmark, BMFavorite } from "../../db";
import { getFailMsg } from "../../util/message";

class favoriteService {
    static async createFolderFavorites({ folder_id, requester_id }) {
        try {
            // 사용자 존재 확인
            const user = await User.findOne({ where: { id: requester_id } });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 폴더 존재 확인
            const folder = await Folder.findOne({ where: { id: folder_id } });
            if (!folder) {
                return getFailMsg({ entity: "폴더", action: "조회" });
            }
            // 폴더 즐겨 찾기 생성
            const [row, created] = await FDFavorite.findOrCreate({
                where: { user_id: user.id, folder_id: folder.id },
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
            const user = await User.findOne({ where: { id: requester_id } });
            if (!user) {
                return getFailMsg({ entity: "사용자", action: "조회" });
            }
            // 북마크 존재 확인
            const bookmark = await Bookmark.findOne({
                where: { id: bookmark_id },
            });
            if (!bookmark) {
                return getFailMsg({ entity: "북마크", action: "조회" });
            }
            // 북마크 즐겨 찾기 생성
            const [row, created] = await BMFavorite.findOrCreate({
                where: { user_id: user.id, bookmark_id: bookmark.id },
            });
            if (created === false) {
                return { errorMessage: "이미 등록된 즐겨찾기 입니다." };
            }
            return row;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { favoriteService };
