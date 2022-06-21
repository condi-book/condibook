import { Website, Keyword, Emoji } from "../../db";
import { parser } from "url-meta-scraper";

class websiteSerivce {
    static async createWebsite(url) {
        // DB에 이미 존재하는 웹사이트인지 확인
        const previous = await Website.findOne({ where: { url } });
        if (previous) {
            return previous;
        }
        // 웹사이트 파싱
        const meta = await parser(url);
        let meta_title = meta.og.title ? meta.og.title : meta.meta.title;
        let meta_description = meta.og.description
            ? meta.og.description
            : meta.meta.description;
        if (!meta_title) {
            meta_title = "정보 없음";
        }
        if (!meta_description) {
            meta_description = "정보 없음";
        }
        const result = await Website.create({
            url,
            meta_title,
            meta_description,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getWebsite({ id }) {
        const info = await Website.findOne({
            where: { id: id },
            raw: true,
            nest: true,
        });
        const keywords = await Keyword.findAll({
            where: { website_id: id },
            attributes: ["keyword", "id"],
            raw: true,
            nest: true,
        });
        const emojis = await Emoji.findAll({
            where: { website_id: id },
            attributes: ["emoji", "id"],
            raw: true,
            nest: true,
        });
        const keyword_list = keywords.map((v) => {
            return v.keyword;
        });
        const emoji_list = emojis.map((v) => {
            return v.keyword;
        });
        const result = { ...info, keyword_list, emoji_list };

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getWebsiteList() {
        const result = await Website.findAll({
            raw: true,
            nest: true,
        });
        // const result = await sequelize.query('SELECT * FROM condibook.websites;');
        console.log(result);
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updateWebsite({ id, toUpdate }) {
        const check = await Website.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        if (!check) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        await Website.update(toUpdate, {
            where: { id },
            raw: true,
            nest: true,
        });
        const result = await Website.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async deleteWebsite({ id }) {
        const result = await Website.destroy({
            where: { id },
            raw: true,
            nest: true,
        });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (result) {
            const Message = "삭제가 완료 되었습니다.";
            return Message;
        }

        return result;
    }
    static async createKeyword({ website_id, ai_keyword }) {
        const result = await Keyword.create({
            keyword: ai_keyword,
            website_id,
        });
        if (!result) {
            const errorMessage = "해당 키워드가 없습니다.";
            return { errorMessage };
        }

        return result;
    }
    static async createEmoji({ website_id, ai_emoji }) {
        const result = await Emoji.create({
            emoji: ai_emoji,
            website_id,
        });
        if (!result) {
            const errorMessage = "해당 이모지가 없습니다.";
            return { errorMessage };
        }

        return result;
    }
}
export { websiteSerivce };
