import { EmojiModel } from "../schema";

class Emoji {
    static async create({ website_id, ai_emoji }) {
        const result = await EmojiModel.create({
            emoji: ai_emoji,
            website_id,
        });
        return result;
    }
    static async findAllById({ id }) {
        const result = await EmojiModel.findAll({
            where: { website_id: id },
            attributes: ["emoji", "id"],
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllList() {
        const result = await EmojiModel.findAll({
            raw: true,
            nest: true,
        });
        return result;
    }
}

export { Emoji };
