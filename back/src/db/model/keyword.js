import { KeywordModel } from "../schema";

class Keyword {
    static async create({ website_id, keyword }) {
        const result = await KeywordModel.create({
            keyword,
            website_id,
        });
        return result;
    }

    static async findAllById({ id }) {
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
