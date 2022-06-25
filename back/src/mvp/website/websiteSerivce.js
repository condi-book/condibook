import axios from "axios";
import { Website, Keyword, Emoji } from "../../db";
import { sortKeyword } from "../../util/AiFunction/sortKeyword";
import { parsers } from "../../util/parser/parser";

class websiteSerivce {
    static async createWebsite({ url }) {
        // 웹사이트 파싱
        let { title, description, img } = await parsers(url);
        if (!title) {
            title = "정보 없음";
        }
        if (!description) {
            description = "정보 없음";
        }
        if (!img) {
            img = "정보 없음";
        }
        // DB에 이미 존재하는 웹사이트인지 확인
        const previous = await Website.findOne({
            where: { url },
            include: [Keyword],
            nest: true,
            raw: true,
        });
        // meta_title, meta_description 변한게 없으면 그대로 반환
        if (
            previous &&
            (previous.meta_title === title ||
                previous.meta_description === description)
        ) {
            return {
                website: previous,
            };
        }
        // 웹사이트 생성
        const newWebsite = await Website.create({
            url,
            meta_title: title,
            meta_description: description,
            img: img,
        });
        if (!newWebsite) {
            return { errorMessage: "서버에러" };
        }
        // 키워드 생성
        let keyword = null;
        axios
            .post("http://localhost:5003/translate", {
                title: newWebsite.meta_title,
                description: newWebsite.meta_description,
            })
            .then((res) => {
                keyword = sortKeyword(res.data);
                this.createKeyword({
                    website_id: newWebsite.id,
                    keyword: keyword,
                });
            })
            .catch(() => {
                console.log("AI 서버 에러❌");
            });
        //이모지 생성 부분 -> 미완
        // const ai_emoji = ai 에서 받아올 것
        // await websiteSerivce.createEmoji({
        //     website_id,
        //     ai_emoji,
        // });

        return {
            website: newWebsite,
            keyword: keyword,
        };
    }
    static async getWebsite({ id }) {
        const info = await Website.findOne({
            where: { id: id },
            raw: true,
            nest: true,
        });
        if (!info) {
            const errorMessage = "해당 웹사이트가 없습니다.";
            return { errorMessage };
        }
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
        const keyword_list = keywords
            .map((v) => {
                return v.keyword.split(",");
            })
            .flat();
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
    static async createKeyword({ website_id, keyword }) {
        const result = await Keyword.create({
            keyword,
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
