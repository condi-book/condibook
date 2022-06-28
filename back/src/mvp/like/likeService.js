import { Like, Post } from "../../db";

class likeService {
    static async createLike({ user_id, post_id }) {
        const postInfo = await Post.findOneById({ id: post_id });
        if (!postInfo) {
            const errorMessage = "해당 게시글이 존재하지 않습니다.";
            return { errorMessage };
        }
        const postInfo_id = postInfo.id;
        const check = await Like.findOne({ user_id, post_id });
        if (check) {
            const errorMessage = "이미 좋아요 한 게시글 입니다.";
            return { errorMessage };
        }
        const result = await Like.create({ user_id, postInfo_id });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        Post.updateLike({ id: post_id });
        return result;
    }
    static async getMyLike({ user_id }) {
        const result = await Like.findmyLikes({ user_id });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getOtherLike({ user_id }) {
        const result = await Like.findOtherLikes({ user_id });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async deleteLike({ user_id, post_id }) {
        const check = await Like.findOne({ user_id, post_id });
        if (!check) {
            const errorMessage = "좋아요한 게시글이 없습니다.";
            return { errorMessage };
        }
        const result = await Like.deleteOne({ user_id, post_id });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        Post.decreaseLike({ id: post_id });
        return result;
    }
}
export { likeService };
