import axios from "axios";
import { Website, Emoji, Keyword } from "../../db";
import { AI_SERVER_URL } from "../../config";
import { parsers } from "../../util/parser/parser";

class websiteSerivce {
    static async createWebsite({ url }) {
        // 웹사이트 파싱
        let { title, description, img } = await parsers(url);
        // DB에 이미 존재하는 웹사이트인지 확인
        const previous = await Website.findByUrl({ url });
        // meta_title, meta_description 변한게 없으면 그대로 반환 아니면 업데이트
        if (previous) {
            if (
                previous.meta_title === title &&
                previous.meta_description === description
            ) {
                // 그대로 유지
                return {
                    website: previous,
                    keyword: previous.keywords,
                };
            } else {
                //업데이트 하기
                const toUpdate = {
                    meta_title: title,
                    meta_description: description,
                    img: img,
                };
                await Website.updateOne({ id: previous.id }, toUpdate); // postgresql을 사용해야 업데이트된 레코드를 받을 수 있다.
                const updatedWebsite = await Website.findByUrl({ url });
                let keyword = null;
                if (title !== null && description !== null) {
                    keyword = await this.getAIKeyword({
                        website_id: updatedWebsite.id,
                        title: updatedWebsite.meta_title,
                        description: updatedWebsite.meta_description,
                    });
                }
                return {
                    website: updatedWebsite,
                    keyword: keyword,
                };
            }
        }
        // 웹사이트 생성
        const newWebsite = await Website.create({
            url,
            title,
            description,
            img,
        });
        if (!newWebsite) {
            return { errorMessage: "서버에러" };
        }
        // 키워드 생성
        let keyword = null;
        if (title !== null && description !== null) {
            keyword = await this.getAIKeyword({
                website_id: newWebsite.id,
                title,
                description,
            });
            return {
                website: newWebsite,
                keyword: keyword,
            };
        }

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
        const info = await Website.findOneById({ id });
        if (!info) {
            const errorMessage = "해당 웹사이트가 없습니다.";
            return { errorMessage };
        }
        const keywords = await Keyword.findAllById({ id });

        const emojis = await Emoji.findAllById({ id });
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
        const result = await Website.findAllList();
        // const result = await sequelize.query('SELECT * FROM condibook.websites;');
        console.log(result);
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updateWebsite({ id, toUpdate }) {
        const check = await Website.findOneById({ id });
        if (!check) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        await Website.updateOne({ id }, toUpdate);
        const result = await Website.findOneById({ id });
        return result;
    }
    static async deleteWebsite({ id }) {
        const result = await Website.deleteOne({ id });

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
        const result = await Keyword.create({ website_id, keyword });
        if (!result) {
            const errorMessage = "해당 키워드가 없습니다.";
            return { errorMessage };
        }

        return result;
    }
    static async createEmoji({ website_id, ai_emoji }) {
        const result = await Emoji.create({ website_id, ai_emoji });
        if (!result) {
            const errorMessage = "해당 이모지가 없습니다.";
            return { errorMessage };
        }

        return result;
    }
    static async getAIKeyword({ website_id, title, description, keyword_id }) {
        let keyword = null;

        try {
            const res = await axios.post(`${AI_SERVER_URL}/translate`, {
                title: title,
                description: description,
            });

            keyword = res.data.hashtags.join(",");

            if (keyword_id) {
                this.updateKeyword({
                    keyword_id: keyword_id,
                    website_id: website_id,
                    keyword: keyword,
                });
            } else {
                this.createKeyword({
                    website_id: website_id,
                    keyword: keyword,
                });
            }
            return keyword;
        } catch (e) {
            console.log("AI 서버 에러❌");
            return keyword;
        }
    }
    static async updateKeyword({ keyword_id, website_id, keyword }) {
        const result = await Keyword.updateOne({
            keyword,
            website_id,
            keyword_id,
        });

        return result;
    }
}
export { websiteSerivce };
