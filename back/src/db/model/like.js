import { LikeModel, PostModel } from "../schema";

class Like {
    static async create({ user_id, postInfo_id }) {
        const result = await LikeModel.create({
            user_id: user_id,
            post_id: postInfo_id,
        });
        return result;
    }

    static findOne({ user_id, post_id }) {
        return LikeModel.findOne({
            where: { user_id, post_id },
        });
    }
    static findmyLikes({ user_id }) {
        return LikeModel.findAll({
            where: { user_id },
            include: {
                model: PostModel,
            },
            raw: true,
            nest: true,
        });
    }
    static findOtherLikes({ user_id }) {
        return LikeModel.findAll({
            where: { user_id },
            include: {
                model: PostModel,
            },
            raw: true,
            nest: true,
        });
    }
    static async findOneById({ id }) {
        const result = await LikeModel.findOne({
            where: { id },
            raw: true,
            nest: true,
        });
        return result;
    }
    static async deleteOne({ user_id, post_id }) {
        const result = await LikeModel.destroy({
            where: { user_id, post_id },
        });
        return result;
    }
}

export { Like };
