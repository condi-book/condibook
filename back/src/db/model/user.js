import { User } from "../schema";

class UserModel {
    static async findOneById({ user_id }) {
        const result = await User.findOne({ where: { id: user_id } });
        return result;
    }
}

export { UserModel };
