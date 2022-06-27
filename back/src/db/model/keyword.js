import { Keyword } from "../schema";

class KeywordModel {
    static async findOneById({ id }) {
        const result = await Keyword.findAll({
            where: { website_id: id },
            attributes: ["keyword", "id"],
            raw: true,
            nest: true,
        });
        return result;
    }
}

export { KeywordModel };
