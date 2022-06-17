import { Post, User } from "../../db";

class postService {
    static async createPost({ toCreate, user_id }) {
        const title = toCreate.title;
        const content = toCreate.content;
        const views = toCreate.views;
        const userinfo = await User.findOne({ where: { id: user_id } });
        const result = await Post.create({
            title,
            content,
            views,
            author: user_id,
            author_name: userinfo.nickname,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getPost({ id }) {
        const result = await Post.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getPostList() {
        const query = { exclude: ["content"] };
        const result = Post.findAll({ attributes: query });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updatePost({ id, toUpdate, user_id }) {
        const chack = await Post.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        if (!chack) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (chack.author != user_id) {
            const errorMessage = "글 작성자가 아닙니다.";
            return { errorMessage };
        }
        await Post.update(toUpdate, {
            where: { id },
            raw: true,
            nest: true,
        });
        const result = await Post.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async deletePost({ id, user_id }) {
        const chack = await Post.findOne({
            where: { id },
        });
        if (chack.author != user_id) {
            const errorMessage = "글 작성자가 아닙니다.";
            return { errorMessage };
        }
        if (!chack) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        Post.destroy({ where: { id } });

        return chack;
    }
    static async updateViews({ id }) {
        const result = Post.increment({ views: 1 }, { where: { id } });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
    }
}
export { postService };
