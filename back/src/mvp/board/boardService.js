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
        const result = await Board.findAll({
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
    static async updateBoard({ id, toUpdate }) {
        let result = await Board.findOne({
            where: { id },
        });
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
        return result;
    }
    static async deleteBoard({ id }) {
        const result = Board.destroy({ where: { id } });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
}
export { boardSerivce };
