import { Post, Folder, Bookmark, Attached } from "../../db";

class attachedService {
    static async createAttached({ user_id, post_id }) {
        const folderInfo = await Folder.findAll({ where: { id: user_id } });
        const bookmarkInfo = await Bookmark.findAll({
            where: { folder_id: folderInfo.id },
        });
        const post_fk_id = await Post.findOne({ where: { id: post_id } });

        // const result = await Attached.create({
        //     bookmark_id: bookmarkInfo.id,
        //     post_id: post_fk_id.id,
        // });
        // if (!result) {
        //     const errorMessage = "해당 데이터가 없습니다.";
        //     return { errorMessage };
        // }
        return bookmarkInfo;
    }
    static async getCheck({ user_id, post_id }) {
        const folderInfo = await Folder.findAll({ where: { user_id } });
        // const bookmarkInfo = await Bookmark.findAll({
        //     where: { folder_id: folderInfo.id },
        // });
        console.log(folderInfo.id)
        // const post_fk_id = await Post.findOne({ where: { id: post_id } });

        // const result = await Attached.create({
        //     bookmark_id: bookmarkInfo.id,
        //     post_id: post_fk_id.id,
        // });
        // if (!result) {
        //     const errorMessage = "해당 데이터가 없습니다.";
        //     return { errorMessage };
        // }
        return folderInfo;
    }
}

export { attachedService };
