import { WebsiteModel, KeywordModel } from "../schema";

class Website {
    static findOne({ website_id }) {
        return WebsiteModel.findOne({ where: { id: website_id } });
    }
    static findOne2({ website_id }) {
        return WebsiteModel.findOne({
            where: { id: website_id },
            raw: true,
            nest: true,
        });
    }
    static findOneByUrl({ url }) {
        return WebsiteModel.findOne({
            where: { url },
            include: [KeywordModel],
            nest: true,
            raw: true,
        });
    }
}

export { Website };
