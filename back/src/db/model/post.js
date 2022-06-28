import { PostModel } from "../schema";

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
        const excludes = { exclude: ["content"] };
        const result = await PostModel.findAll({
            attributes: excludes,
            order: [["createdAt", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }
    static async findAllByViews({ offset }) {
        const excludes = { exclude: ["content"] };
        const result = PostModel.findAll({
            attributes: excludes,
            order: [["views", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }
    static async findAllByLikes({ offset }) {
        const excludes = { exclude: ["content"] };
        const result = PostModel.findAll({
            attributes: excludes,
            order: [["like_counts", "DESC"]],
            offset: offset,
            limit: 20,
        });
        return result;
    }

    static async updateOne({ id, toUpdate }) {
        const result = await PostModel.update(toUpdate, {
            where: { id },
            raw: true,
            nest: true,
        });

        return result;
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
        const result = await PostModel.destroy({
            where: { id },
        });
        return result;
    }
}

export { Post };
