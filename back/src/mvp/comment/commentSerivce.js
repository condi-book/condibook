import { User, Comment, Post } from "../../db";

class commentSerivce {
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
    static async getComment({ id }) {
        const result = await Comment.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getCommentList({ post_id }) {
        const result = Comment.findAll({ where: { post_id } });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updateComment({ id, user_id, content }) {
        const check = await Comment.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        if (!check) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (!check.author == user_id) {
            const errorMessage = "댓글 작성자가 아닙니다.";
            return { errorMessage };
        }
        await Comment.update(
            { content },
            {
                where: { id },
                raw: true,
                nest: true,
            },
        );
        const result = await Comment.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async deleteComment({ id, user_id }) {
        const check = await Comment.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        if (!check) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (!check.author == user_id) {
            const errorMessage = "댓글 작성자가 아닙니다.";
            return { errorMessage };
        }
        await Comment.destroy({
            where: { id },
        });
        return check;
    }
}

export { commentSerivce };
