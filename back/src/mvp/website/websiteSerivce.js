import { Website, Emoji, Keyword } from "../../db";
import { parser } from "url-meta-scraper";
import { sequelize } from "../../db";


class websiteSerivce {
    static async createWebsite(url) {
        
        const meta = await parser(url); 
        const meta_title = meta.og.title ? meta.og.title : meta.meta.title
        const meta_description = meta.og.description ? meta.og.description : meta.meta.description
        
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
    static async updateWebsite({id, toUpdate}) {
        let result = await Website.findAll({
            where : {id},
            raw: true,
            nest: true,
        })
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (toUpdate.url) {
            result = await Website.update({url : toUpdate.url},
            {
            where : {id},
            raw: true,
            nest: true,
        })
        }
        if (toUpdate.meta_title) {
            result = await Website.update({meta_title : toUpdate.meta_title},
            {
            where : {id},
            raw: true,
            nest: true,
        })
        }
        if (toUpdate.meta_description) {
            result = await Website.update({meta_description : toUpdate.meta_description},
            {
            where : {id},
            raw: true,
            nest: true,
        })
        }
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result
    }
    static async deleteWebsite({id}) {
        const result = await Website.destroy({
            where : {id},
            raw: true,
            nest: true,
        })

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (result){
            const Message = "삭제가 완료 되었습니다."
            return Message
        }
        
        return result
    }
}
export { websiteSerivce };