import { Website } from "../schema";
import { Keyword } from "../schema";

class WebsiteModel {
    static async create({ url, title, description, img }) {
        const result = await Website.create({
            url,
            meta_title: title,
            meta_description: description,
            img: img,
        });
        return result;
    }

    static async findByUrl({ url }) {
        const result = await Website.findOne({
            where: { url },
            include: [Keyword],
            nest: true,
            raw: true,
        });
        return result;
    }
    static async findOneById({ id }) {
        const result = await Website.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllById({ id }) {
        const result = await Website.findAll({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllList() {
        const result = await Website.findAll({
            raw: true,
            nest: true,
        });
        return result;
    }

    static async updateOne({ id, toUpdate }) {
        const result = await Website.update(toUpdate, {
            where: { id },
            raw: true,
            nest: true,
        });

        return result;
    }

    static async deleteOne({ id }) {
        const result = await Website.destroy({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
}

export { WebsiteModel };
