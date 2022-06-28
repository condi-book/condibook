import { PostModel } from "../schema";
import { CommentModel } from "../schema";

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
    static async findAllList() {
        const result = await PostModel.findAll({
            raw: true,
            nest: true,
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

    static async deleteOne({ id }) {
        const result = await PostModel.destroy({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
}

export { Post };
