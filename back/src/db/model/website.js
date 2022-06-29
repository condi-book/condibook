import { WebsiteModel, KeywordModel, CategoryModel } from "../schema";

class Website {
    static async create({ url, title, description, img }) {
        const result = await WebsiteModel.create({
            url,
            meta_title: title,
            meta_description: description,
            img: img,
        });
        return result;
    }

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
    static findByUrl({ url }) {
        return WebsiteModel.findOne({
            where: { url },
            include: [KeywordModel, CategoryModel],
            nest: true,
            raw: true,
        });
    }
    static findWithKeywordCategoryById({ website_id }) {
        return WebsiteModel.findOne({
            where: { id: website_id },
            include: [KeywordModel, CategoryModel],
            nest: true,
            raw: true,
        });
    }
    static async findOneById({ id }) {
        const result = await WebsiteModel.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllById({ id }) {
        const result = await WebsiteModel.findAll({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllList() {
        const result = await WebsiteModel.findAll({
            raw: true,
            nest: true,
        });
        return result;
    }

    static async updateOne({ id }, toUpdate) {
        const result = await WebsiteModel.update(toUpdate, {
            where: { id },
            raw: true,
            nest: true,
        });

        return result;
    }

    static async deleteOne({ id }) {
        const result = await WebsiteModel.destroy({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
}

export { Website };
