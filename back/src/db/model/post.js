import { Post } from "../schema";
import { Comment } from "../schema";

class PostModel {
    static async create({ title, content, views, user_id, nickname }) {
        const result = await Post.create({
            title,
            content,
            views,
            author: user_id,
            author_name: nickname,
        });
        return result;
    }

    static async findOneById({ id }) {
        const result = await Post.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllById({ id }) {
        const result = await Post.findAll({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async findAllList() {
        const result = await Post.findAll({
            raw: true,
            nest: true,
        });
        return result;
    }

    static async updateOne({ id, toUpdate }) {
        const result = await Post.update(toUpdate, {
            where: { id },
            raw: true,
            nest: true,
        });

        return result;
    }

    static async deleteOne({ id }) {
        const result = await Post.destroy({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
}

export { PostModel };
