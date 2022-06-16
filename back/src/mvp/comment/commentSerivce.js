import { User, Comment, Board } from "../../db";

class commentSerivce {
    static async createComment({ content, user_id, board_id }) {
        if (!content) {
            const errorMessage = "댓글내용이 없습니다.";
            return { errorMessage };
        }

        const userinfo = await User.findOne({ where: { id: user_id } });
        const board_fk_id = await Board.findOne({ where: { id: board_id } });

        const result = await Comment.create({
            content,
            author: user_id,
            author_name: userinfo.nickname,
            board_id: board_fk_id.id,
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
    static async getCommentList({ board_id }) {
        const result = Comment.findAll({ where: { board_id } });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updateComment({ id, user_id, content }) {
        const chack = await Comment.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        if (!chack) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (!chack.author == user_id) {
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
}

export { commentSerivce };
