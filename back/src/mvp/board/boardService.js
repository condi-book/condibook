import { Board } from "../../db";

class boardSerivce {
    static async createBoard({ toCreate }) {
        const title = toCreate.title;
        const content = toCreate.content;
        const views = toCreate.views;
        const result = await Board.create({
            title,
            content,
            views,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
}
export { boardSerivce };
