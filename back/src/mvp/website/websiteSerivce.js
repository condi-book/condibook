import { Website } from "../../db";
import { parser } from "url-meta-scraper";


class websiteSerivce {
    static async createWebsite(url) {
        
        const meta = await parser(url);
        const meta_title = meta.og.title
        const meta_description = meta.og.description
        
        if(meta_description == "undefined") {
            meta_description =meta.meta.description
        }
        
        
        const result = await Website.create({ url, meta_title, meta_description })
        console.log(result)
        return result;
    }
}

export { websiteSerivce };