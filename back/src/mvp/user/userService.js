import { User } from "../../db";
import jwt from "jsonwebtoken";

class userService {
    static async login({ nickname, email, image_url }) {
        // 사용자 조회
        let user = await User.findOne({ where: { email } });

        // 존재하지 않은 사용자 -> 계정 생성
        if (!user) {
            user = await User.create({ nickname, email, image_url });
        }

        // JWT 생성
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({ user_id: user.email }, secretKey);

        // 사용자 정보 + JWT 반환
        const result = {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            image_url: user.image_url,
            token: token,
        };
        return result;
    }
}

export { userService };
