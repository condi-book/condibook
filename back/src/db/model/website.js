import { WebsiteModel } from "../schema";
import { KeywordModel } from "../schema";

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

    static async findByUrl({ url }) {
        const result = await WebsiteModel.findOne({
            where: { url },
            include: [KeywordModel],
            nest: true,
            raw: true,
        });
        return result;
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

    static async updateOne({ id, toUpdate }) {
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
