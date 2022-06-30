import axios from "axios";
import { Website, Keyword, Category } from "../../db";
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
                    keywords: previous.keywords,
                    category: previous.category,
                };
            } else {
                // 다시 AI 결과 받아서 업데이트 하기
                let keyword = null;
                let category = null;

                if (title !== null && description !== null) {
                    const aiResponse = await this.getAIResponse({
                        title: title,
                        description: description,
                    });

                    keyword = aiResponse.keyword;
                    category = aiResponse.category;

                    // 키워드 업데이트
                    if (keyword) {
                        this.updateKeyword({
                            keyword_id: previous.keywords.id,
                            website_id: previous.id,
                            keyword: keyword,
                        });
                    }
                    // 카테고리 정보 추가
                    if (category) {
                        category = await Category.findOneByCategory({
                            category: category,
                        });
                        await websiteSerivce.updateWebsite({
                            id: previous.id,
                            toUpdate: { category_id: category.id },
                        });
                    }
                } else {
                    this.updateKeyword({
                        keyword_id: previous.keywords.id,
                        website_id: previous.id,
                        keyword: "etc",
                    });
                    category = await Category.findOneByCategory({
                        category: "etc",
                    });
                    await websiteSerivce.updateWebsite({
                        id: previous.id,
                        toUpdate: { category_id: category.id },
                    });
                }
                // 업데이트
                const toUpdate = {
                    meta_title: title,
                    meta_description: description,
                    img: img,
                };
                await Website.updateOne({ id: previous.id }, toUpdate);

                const updatedWebsite = await Website.findByUrl({ url }); // postgresql을 사용해야 업데이트된 레코드를 받을 수 있다.

                return {
                    website: updatedWebsite,
                    keywords: keyword,
                    category: category,
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
        const newWebsite_id = newWebsite_id;
        // AI 요청
        let keyword = null;
        let category = null;
        if (title !== null && description !== null) {
            const aiResponse = await this.getAIResponse({
                title,
                description,
            });

            keyword = aiResponse.keyword;
            category = aiResponse.category;

            // 키워드 생성
            if (keyword) {
                this.createKeyword({
                    website_id: newWebsite_id,
                    keyword: keyword,
                });
            }
            // 카테고리 정보 추가
            if (category) {
                category = await Category.findOneByCategory({
                    category: aiResponse.category,
                });
                await websiteSerivce.updateWebsite({
                    id: newWebsite_id,
                    toUpdate: { category_id: category.id },
                });
            }
        } else {
            keyword = "etc";
            category = "etc";
            this.createKeyword({
                website_id: newWebsite_id,
                keyword: keyword,
            });
            category = await Category.findOneByCategory({
                category: category,
            });
            await websiteSerivce.updateWebsite({
                id: newWebsite_id,
                toUpdate: { category_id: category.id },
            });
        }

        return {
            website: newWebsite,
            keywords: keyword,
            category,
        };
    }
    static async getAIResponse({ title, description }) {
        let keyword = null;
        let category = null;

        try {
            const res = await axios.post(`${AI_SERVER_URL}/translate`, {
                title: title,
                description: description,
            });

            if (res.data.ErrorMessage) {
                category = res.data.category;
                throw Error(res.data.ErrorMessage);
            }

            keyword = res.data.hashtags.join(",");
            category = res.data.category;

            return { keyword, category };
        } catch (e) {
            console.log("AI 서버 에러❌");
            return { keyword, category };
        }
    }
    static async getWebsite({ id }) {
        try {
            const info = await Website.findOneById({ id });
            if (!info) {
                const errorMessage = "해당 웹사이트가 없습니다.";
                return { errorMessage };
            }
            const keywords = await Keyword.findOneById({ id });

            const category = await Category.findOneById({
                category_id: info.category_id,
            });

            const keyword_list = keywords
                .map((v) => {
                    return v.keyword.split(",");
                })
                .flat();
            const result = { ...info, keyword_list, category };

            if (!result) {
                const errorMessage = "해당 데이터가 없습니다.";
                return { errorMessage };
            }
            return result;
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async getWebsiteList() {
        const result = await Website.findAllList();
        // const result = await sequelize.query('SELECT * FROM condibook.websites;');
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
        const result = await Website.findWithKeywordCategoryById({
            website_id: id,
        });
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
