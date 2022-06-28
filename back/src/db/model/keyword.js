import { KeywordModel } from "../schema";

class Keyword {
    static async findOneById({ id }) {
        const result = await KeywordModel.findAll({
            where: { website_id: id },
            attributes: ["keyword", "id"],
            raw: true,
            nest: true,
        });
        return result;
    }
}

export { Keyword };
