import { UserModel } from "../schema";

class User {
    static async findOneById({ user_id }) {
        const result = await UserModel.findOne({ where: { id: user_id } });
        return result;
    }
}

export { User };
