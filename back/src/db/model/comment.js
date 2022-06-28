import { CommentModel } from "../schema";

class Comment {
    static async create({ content, user_id, userInfo_nickname, postInfo_id }) {
        const result = await CommentModel.create({
            content,
            author: user_id,
            author_name: userInfo_nickname,
            post_id: postInfo_id,
        });
        return result;
    }

    static findById({ id }) {
        return CommentModel.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
    }
    static getComments({ post_id }) {
        return CommentModel.findAll({ where: { post_id } });
    }
    static updateOne({ id, content }) {
        return CommentModel.update(
            { content },
            {
                where: { id },
                raw: true,
                nest: true,
            },
        );
    }
    static deleteOne({ id }) {
        return CommentModel.destroy({
            where: { id },
        });
    }
}

export { Comment };
