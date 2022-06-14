import { Board, User } from "../../db";

class boardSerivce {
    static async createBoard({ toCreate, id }) {
        const title = toCreate.title;
        const content = toCreate.content;
        const views = toCreate.views;
        const userinfo = await User.findOne({ where: { id: id } });
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
        const result = Board.findOne({ where: { id: id } });

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
}
export { boardSerivce };
