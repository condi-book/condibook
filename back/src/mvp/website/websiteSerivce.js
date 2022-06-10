import { Website, Emoji, Keyword } from "../../db";
import { parser } from "url-meta-scraper";
import { sequelize } from "../../db";


class websiteSerivce {
    static async createWebsite(url) {
        
        const meta = await parser(url); 
        const meta_title = meta.og.title ?? meta.meta.title
        const meta_description = meta.og.description ?? meta.meta.description
        
        const result = await Website.create({ url, meta_title, meta_description })
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }

        return result;
    }
    static async getWebsite({id}) {
        const result = await Website.findAll({
            where : {id},
            include: [{
                model: Keyword,
                where: {website_id : id},
                attributes : ['keyword']
            }],
            raw: true,
            nest: true,
        })

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result
    }
    static async getWebsiteList() {
        const result = await Website.findAll({
            include: [{
                model: Keyword,
                attributes : ['keyword']
            }],
            raw: true,
            nest: true,
        })
        // const result = await sequelize.query('SELECT * FROM condibook.websites;');
        console.log(result)
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result
    }

}

export { websiteSerivce };