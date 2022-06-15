import { Board, User } from "../../db";

class boardSerivce {
    static async createBoard({ toCreate, id }) {
        const title = toCreate.title;
        const content = toCreate.content;
        const views = toCreate.views;
        const userinfo = await User.findOne({ where: { id } });
        const result = await Board.create({
            title,
            content,
            views,
            author: id,
            author_name: userinfo.nickname,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getBoard({ id }) {
        const result = await Board.findOne({
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
    static async getBoardList() {
        const query = { exclude: ["content"] };
        const result = Board.findAll({ attributes: query });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updateBoard({ id, toUpdate, user_id }) {
        let result = await Board.findOne({
            where: { id },
        });
        const chack = await Board.findOne({
            where: { id },
        });
        if (chack.author != user_id) {
            const errorMessage = "글 작성자가 아닙니다.";
            return { errorMessage };
        }
        if (!result) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        if (toUpdate.title) {
            result = await Board.update(
                { title: toUpdate.title },
                {
                    where: { id },
                    raw: true,
                    nest: true,
                },
            );
        }
        if (toUpdate.content) {
            result = await Board.update(
                { content: toUpdate.content },
                {
                    where: { id },
                    raw: true,
                    nest: true,
                },
            );
        }
        return chack;
    }
    static async deleteBoard({ id, user_id }) {
        const chack = await Board.findOne({
            where: { id },
        });
        if (chack.author != user_id) {
            const errorMessage = "글 작성자가 아닙니다.";
            return { errorMessage };
        }
        if (!chack) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        const result = Board.destroy({ where: { id } });

        return result;
    }
    static async updateViews({ id }) {
        const result = Board.increment({ views: 1 }, { where: { id } });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
    }
}
export { boardSerivce };
