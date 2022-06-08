import { Website } from "../../db";
import  parser  from "html-metadata-parser"

class websiteSerivce {
    static async createWebsite({ url }) {
        var a = await parser(url);
        const meta_title = a.meta
        const meta_description = a.description
        
        // const result = await Website.create({ url, meta_title, meta_description });
        
        return meta_title;
    }
}

export { websiteSerivce };
