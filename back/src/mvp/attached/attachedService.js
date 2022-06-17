import { User, Comment, Post } from "../../db";

class attachedService {
    static async createComment({ content, user_id, post_id }) {
        if (!content) {
            const errorMessage = "댓글내용이 없습니다.";
            return { errorMessage };
        }

        const userinfo = await User.findOne({ where: { id: user_id } });
        const post_fk_id = await Post.findOne({ where: { id: post_id } });

        const result = await Comment.create({
            content,
            author: user_id,
            author_name: userinfo.nickname,
            post_id: post_fk_id.id,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
}

export { attachedService };
