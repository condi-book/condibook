import {
    AttachedModel,
    PostModel,
    sequelize,
    Op,
    BookmarkModel,
    Sequelize,
    Transaction,
} from "../schema";

class Post {
    static async create({ title, content, views, user_id, nickname }) {
        const result = await PostModel.create({
            title,
            content,
            views,
            author: user_id,
            author_name: nickname,
        });
        return result;
    }

    static async findOneById({ id }) {
        const result = await PostModel.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllById({ id }) {
        const result = await PostModel.findAll({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllList({ offset }) {
        const result = await PostModel.findAll({
            order: [["createdAt", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }
    static async findAllByViews({ offset }) {
        const result = PostModel.findAll({
            order: [["views", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }
    static async findAllByLikes({ offset }) {
        const result = PostModel.findAll({
            order: [["like_counts", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }
    static async searchAllByQuery({ offset, content, type }) {
        const excludes = { exclude: ["content"] };
        if (type == 1) {
            const result = PostModel.findAll({
                attributes: excludes,
                where: Sequelize.literal(
                    "MATCH (`title`, `content`) AGAINST (:search IN NATURAL LANGUAGE MODE)",
                ),
                replacements: {
                    search: content,
                },
                order: [["views", "DESC"]],
                offset: offset,
                limit: 20,
                raw: true,
                nest: true,
            });
            return result;
        }
        const result = PostModel.findAll({
            attributes: excludes,
            where: {
                title: { [Op.like]: `%${content}%` },
            },
            order: [["createdAt", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }
    static async searchAllByLikes({ offset, content, type }) {
        const excludes = { exclude: ["content"] };
        if (type == 1) {
            const result = PostModel.findAll({
                attributes: excludes,
                where: Sequelize.literal(
                    "MATCH (`title`, `content`) AGAINST (:search IN NATURAL LANGUAGE MODE)",
                ),
                replacements: {
                    search: content,
                },
                order: [["views", "DESC"]],
                offset: offset,
                limit: 20,
            });
            return result;
        }
        const result = PostModel.findAll({
            attributes: excludes,
            where: {
                title: { [Op.like]: `%${content}%` },
            },
            order: [["like_counts", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }
    static async searchAllByViews({ offset, content, type }) {
        const excludes = { exclude: ["content"] };
        if (type == 1) {
            const result = PostModel.findAll({
                attributes: excludes,
                where: Sequelize.literal(
                    "MATCH (`title`, `content`) AGAINST (:search IN NATURAL LANGUAGE MODE)",
                ),
                replacements: {
                    search: content,
                },
                order: [["views", "DESC"]],
                offset: offset,
                limit: 20,
            });
            return result;
        }
        const result = PostModel.findAll({
            attributes: excludes,
            where: {
                title: { [Op.like]: `%${content}%` },
            },
            order: [["views", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }

    static async updateOne({ id, toUpdate, bookmark_id }) {
        try {
            await sequelize.transaction(
                {
                    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
                },
                // eslint-disable-next-line no-unused-vars
                async (t) => {
                    const result = await PostModel.update(toUpdate, {
                        where: { id },
                        raw: true,
                        nest: true,
                    });

                    if (bookmark_id) {
                        const check = await AttachedModel.findAll({
                            where: { post_id: id },
                        });
                        if (check) {
                            await AttachedModel.destroy({
                                where: {
                                    [Op.or]: [
                                        { post_id: null },
                                        { post_id: id },
                                    ],
                                },
                            });
                        }
                        const bookmarkInfo = await BookmarkModel.findAll({
                            where: {
                                id: {
                                    [Op.in]: bookmark_id,
                                },
                            },
                            raw: true,
                            nest: true,
                        });
                        await Promise.all(
                            bookmarkInfo.map(async (v) => {
                                AttachedModel.create({
                                    bookmark_id: v.id,
                                    post_id: id,
                                });
                            }),
                        );
                        return result;
                    }
                },
            );
        } catch (e) {
            return { errorMessage: e };
        }
    }
    static async updateView({ id }) {
        const result = await PostModel.increment(
            { views: 1 },
            { where: { id } },
        );

        return result;
    }
    static async updateLike({ id }) {
        const result = await PostModel.increment(
            { like_counts: 1 },
            { where: { id } },
        );

        return result;
    }
    static async decreaseLike({ id }) {
        const result = await PostModel.increment(
            { like_counts: -1 },
            { where: { id } },
        );

        return result;
    }

    static async deleteOne({ id }) {
        const t = await sequelize.transaction();
        try {
            const result = await PostModel.destroy({
                where: { id },
                transaction: t,
            });

            await AttachedModel.destroy({
                where: { [Op.or]: [{ post_id: null }, { post_id: id }] },
                transaction: t,
            });
            await t.commit();

            return result;
        } catch (e) {
            await t.rollback();
            return { errorMessage: e };
        }
    }
    static async updateNickname({ user_id, nickname }) {
        const t = await sequelize.transaction();
        try {
            await PostModel.update(
                { author_name: nickname },
                {
                    where: {
                        author: user_id,
                    },
                    transaction: t,
                },
            );
            await t.commit();

            return { mes: "업데이트 완료!" };
        } catch (e) {
            await t.rollback();
            return { errorMessage: e };
        }
    }
    static async deletePosts({ user_id }) {
        const t = await sequelize.transaction();
        try {
            await PostModel.destroy({
                where: {
                    [Op.or]: [{ author: null }, { author: user_id }],
                },
                transaction: t,
            });
            await t.commit();

            return { mes: "삭제 완료!" };
        } catch (e) {
            await t.rollback();
            return { errorMessage: "삭제 실패!" };
        }
    }
}

export { Post };
