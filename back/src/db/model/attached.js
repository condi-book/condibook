import {
    AttachedModel,
    BookmarkModel,
    sequelize,
    WebsiteModel,
    Op,
} from "../schema";

class Attached {
    static async create({ bookmark_id, post_id }) {
        const result = await AttachedModel.create({
            bookmark_id: bookmark_id,
            post_id,
        });
        return result;
    }
    static async bulkCreate({ bookmark_id, post_id }) {
        const t = await sequelize.transaction();
        try {
            if (bookmark_id) {
                const bookmarkInfo = await BookmarkModel.findAll({
                    where: {
                        id: {
                            [Op.in]: bookmark_id,
                        },
                    },
                    raw: true,
                    nest: true,
                    transaction: t,
                });
                bookmarkInfo.map(async (v) => {
                    await AttachedModel.create({
                        bookmark_id: v.id,
                        post_id: post_id,
                    });
                });
                await t.commit();
                return { mes: "생성 완료!" };
            }
        } catch (e) {
            t.rollback();
            return { errorMessage: e };
        }
    }

    static async findByPostId({ post_id }) {
        const result = await AttachedModel.findAll({
            where: { post_id: post_id },
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
