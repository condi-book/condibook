import { User, Comment, Post } from "../../db";

class commentSerivce {
    static async createComment({ content, user_id, post_id }) {
        if (!content) {
            const errorMessage = "댓글내용이 없습니다.";
            return { errorMessage };
        }

        const userInfo = await User.findOne({ user_id });
        if (!userInfo) {
            const errorMessage = "유저 정보가 없습니다.";
            return { errorMessage };
        }
        const postInfo = await Post.findOneById({ id: post_id });
        if (!postInfo) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        const userInfo_nickname = userInfo.nickname;
        const postInfo_id = postInfo.id;

        const result = await Comment.create({
            content,
            user_id,
            userInfo_nickname,
            postInfo_id,
        });
        if (!result) {
            const errorMessage = "댓글 생성에 실패 하였습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getComment({ id }) {
        const result = await Comment.findById({ id });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getCommentList({ post_id }) {
        const result = Comment.getComments({ post_id });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updateComment({ id, user_id, content }) {
        const check = await Comment.findById({ id });
        if (!check) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (!check.author == user_id) {
            const errorMessage = "댓글 작성자가 아닙니다.";
            return { errorMessage };
        }
        await Comment.updateOne({ id, content });

        const result = await Comment.findById({ id });

        return result;
    }
    static async deleteComment({ id, user_id }) {
        const check = await Comment.findById({ id });

        if (!check) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (!check.author == user_id) {
            const errorMessage = "댓글 작성자가 아닙니다.";
            return { errorMessage };
        }
        await Comment.deleteOne({ id });

        return check;
    }
}

export { commentSerivce };
