import { UserModel, Op } from "../schema";
import { userIdInput, userInterface } from "../interfaces/userInput";
class User {
    static create(data: userInterface) {
        return UserModel.create({
            nickname: data.nickname,
            email: data.email,
            image_url: data.image_url,
        });
    }
    static findOne(data: userInterface) {
        return UserModel.findOne({ where: { id: data.user_id } });
    }
    static findOneByEmail({ email }) {
        return UserModel.findOne({ where: { email: email } });
    }
    static findOneByUserIdEmail({ user_id, email }) {
        return UserModel.findOne({ where: { id: user_id, email: email } });
    }
    static findAllByNickname({ nickname }) {
        return UserModel.findAll({
            attributes: ["id", "nickname", "email", "image_url"],
            where: {
                nickname: {
                    [Op.like]: `%${nickname}%`,
                },
            },
            order: ["nickname"],
        });
    }
    static updateNickname({ user_id, nickname }) {
        return UserModel.update({ nickname }, { where: { id: user_id } });
    }

    static updateIntro({ user_id, intro }) {
        return UserModel.update({ intro }, { where: { id: user_id } });
    }

    static destroyOne({ user_id }) {
        return UserModel.destroy({ where: { id: user_id } });
    }
}

export { User };
