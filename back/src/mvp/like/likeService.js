import { Like, Post } from "../../db";

class likeService {
    static async createLike({ user_id, post_id }) {
        const post_fk_id = await Post.findOne({ where: { id: post_id } });
        if (!post_fk_id) {
            const errorMessage = "해당 게시글이 존재하지 않습니다.";
            return { errorMessage };
        }
        const chack = await Like.findOne({
            where: { user_id, post_id },
        });
        if (chack) {
            const errorMessage = "이미 좋아요 한 게시글 입니다.";
            return { errorMessage };
        }
        const result = await Like.create({
            user_id: user_id,
            post_id: post_fk_id.id,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getMyLike({ user_id }) {
        const result = await Like.findAll({
            where: { user_id },
            include: {
                model: Post,
            },
            raw: true,
            nest: true,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getOtherLike({ user_id }) {
        const result = await Like.findAll({
            where: { user_id },
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async deleteLike({ user_id, post_id }) {
        const chack = await Like.findOne({
            where: { user_id, post_id },
        });
        if (!chack) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        const result = await Like.destroy({
            where: { user_id, post_id },
        });
        if (result == 1) {
            const message = "삭제가 완료 되었습니다.";
            return { message };
        }
        return result;
    }
}
export { likeService };
