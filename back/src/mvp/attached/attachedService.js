import { Folder, Bookmark, Attached, Op, Post } from "../../db";
class attachedService {
    static async createAttached({ user_id, post_id }) {
        const postInfo = await Post.findOne({ where: { id: post_id } });
        if (!postInfo) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        const folderInfo = await Folder.findAll({ where: { user_id } });
        if (!folderInfo) {
            const errorMessage = "북마크 목록이 없습니다.";
            return { errorMessage };
        }
        const folder_ids = folderInfo.map((v) => {
            return v.id;
        });
        const bookmarkInfo = await Bookmark.findAll({
            where: {
                folder_id: {
                    [Op.in]: folder_ids,
                },
            },
            raw: true,
            nest: true,
        });
        const creation = bookmarkInfo.map(async (v) => {
            await Attached.create({
                bookmark_id: v.id,
                post_id,
            });
        });
        if (!creation) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        const result = await Attached.findAll({
            where: { post_id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async getAttached({ post_id }) {
        const result = Attached.findAll({
            where: { post_id },
            include: [{ model: Bookmark }],
            raw: true,
            nest: true,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }

        return result;
    }
}

export { attachedService };
