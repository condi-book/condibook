import { User } from "../../db";

class userService {
    static async createUser({ nickname, email, image }) {
        const result = await User.create({ nickname, email, image });
        return result;
    }
}

export { userService };
