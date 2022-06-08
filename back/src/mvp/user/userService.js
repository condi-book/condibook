import { User } from "../../db";

class userService {
    static async createUser({ nickname, email, image_url }) {
        const result = await User.create({ nickname, email, image_url });
        return result;
    }
}

export { userService };
