import { Folder, Bookmark, Attached, Op, Post, Website } from "../../db";
class attachedService {
    static async createAttached({ user_id, post_id, bookmark_id }) {
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

        const bookmarkInfo = await Bookmark.findAll({
            where: {
                id: {
                    [Op.in]: bookmark_id,
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
        const result = await Attached.findAll({
            where: { post_id },
            include: [{ model: Bookmark, include: [{ model: Website }] }],
            raw: true,
            nest: true,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        const send = result.map((v) => {
            return v.bookmark.website;
        });
        return send;
    }
    static async addAttached({ post_id, bookmark_id }) {
        const check = await Bookmark.findOne({
            where: { id: bookmark_id },
        });
        if (!check) {
            const errorMessage = "해당 북마크 정보가 없습니다.";
            return { errorMessage };
        }
        await Attached.create({
            post_id,
            bookmark_id,
        });
        const result = await Attached.findAll({
            where: { post_id },
            include: [{ model: Bookmark }],
            raw: true,
            nest: true,
        });
        return result;
    }
    static async deleteOneAttached({ post_id, bookmark_id }) {
        const check = await Attached.findOne({
            where: { post_id, bookmark_id },
        });
        if (!check) {
            const errorMessage = "첨부된 해당 북마크 정보가 없습니다.";
            return { errorMessage };
        }
        await Attached.destroy({
            where: { post_id, bookmark_id },
        });
        const result = await Attached.findAll({
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
    static async deleteAttached({ post_id }) {
        const check = await Post.findOne({
            where: { id: post_id },
        });
        if (!check) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        await Attached.destroy({
            where: { post_id },
        });
        const result = await Attached.findAll({
            where: { post_id },
        });
        return result;
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
        const result = await Attached.findAll({
            where: { post_id: null },
        });
        return result;
    }
}

export { attachedService };
