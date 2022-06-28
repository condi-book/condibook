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

    static async updateOne({ keyword, website_id, keyword_id }) {
        const result = await KeywordModel.update(
            {
                keyword,
                website_id,
            },
            { where: { id: keyword_id } },
        );
        return result;
    }
}
export { Keyword };
