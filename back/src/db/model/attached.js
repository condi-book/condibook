import { AttachedModel, BookmarkModel, WebsiteModel } from "../schema";

class Attached {
    static async create({ bookmark_id, post_id }) {
        const result = await AttachedModel.create({
            bookmark_id: bookmark_id,
            post_id,
        });
        return result;
    }

    static async findByPostId({ id }) {
        const result = await AttachedModel.findAll({
            where: { post_id: id },
            include: [
                { model: BookmarkModel, include: [{ model: WebsiteModel }] },
            ],
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findByboomarkId({ post_id, bookmark_id }) {
        const result = await AttachedModel.findOne({
            where: { post_id, bookmark_id },
        });
        return result;
    }
    static async deleteOne({ post_id, bookmark_id }) {
        const result = await AttachedModel.destroy({
            where: { post_id, bookmark_id },
        });
        return result;
    }
    static async deleteAll({ post_id }) {
        const result = await AttachedModel.destroy({
            where: { post_id },
        });
        return result;
    }
}

export { Attached };
