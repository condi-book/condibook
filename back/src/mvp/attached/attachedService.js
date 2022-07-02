import { Folder, Bookmark, Attached, Post } from "../../db";
class attachedService {
    static async createAttached({ user_id, post_id, bookmark_id }) {
        const postInfo = await Post.findOneById({ id: post_id });
        if (!postInfo) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        const folderInfo = await Folder.findAllOnlyId({ user_id });
        if (!folderInfo) {
            const errorMessage = "북마크 목록이 없습니다.";
            return { errorMessage };
        }

        const creation = await Attached.bulkCreate({ bookmark_id, post_id });
        if (!creation) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        const result = await Attached.findByPostId({ post_id });
        return result;
    }
    static async getAttached({ post_id }) {
        const result = await Attached.findByPostId({ post_id });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async addAttached({ post_id, bookmark_id }) {
        const check = await Bookmark.findOne({ bookmark_id });
        if (!check) {
            const errorMessage = "해당 북마크 정보가 없습니다.";
            return { errorMessage };
        }
        await Attached.create({
            post_id,
            bookmark_id,
        });
        const result = await Attached.findByPostId({ post_id });
        return result;
    }
    static async deleteOneAttached({ post_id, bookmark_id }) {
        const check = await Attached.findByboomarkId({ post_id, bookmark_id });
        if (!check) {
            const errorMessage = "첨부된 해당 북마크 정보가 없습니다.";
            return { errorMessage };
        }
        await Attached.deleteOne({ post_id, bookmark_id });

        const result = await Attached.findByPostId({ post_id });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }

        return result;
    }
    static async deleteAttached({ post_id }) {
        const check = await Post.findOneById({ id: post_id });
        if (!check) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        await Attached.deleteAll({ post_id });

        return check;
    }
    static async deleteAttachedNull() {
        const check = await Attached.findAll({
            where: { post_id: null },
        });
        if (check) {
            await Attached.destroy({
                where: { post_id: null },
            });
        }
        return check;
    }
}

export { attachedService };
