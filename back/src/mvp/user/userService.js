import { User } from "../../db";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getQueryResultMsg } from "../../middlewares/errorMiddleware";
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
        const token = jwt.sign(
            { user_id: user.id, email: user.email },
            secretKey,
        );

        // 사용자 정보 + JWT 반환
        const result = {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            image_url: user.image_url,
            intro: user.intro,
            token: token,
        };
        return result;
    }

    static async getKakaoToken(code) {
        // 코드로 토큰 발급
        const token = await axios
            .post(
                "https://kauth.kakao.com/oauth/token",
                new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.KAKAO_CLIENT_ID,
                    redirect_uri:
                        process.env.CLIENT_URL + "/callback/login/kakao",
                    code: code,
                }),
            )
            .then((res) => res.data.access_token);

        return token;
    }

    static async getKakaoAccount(token) {
        // 토큰으로 사용자 정보 조회
        const account = await axios
            .get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                return {
                    nickname: res.data.properties.nickname,
                    email: res.data.kakao_account.email,
                    image_url: res.data.properties.profile_image,
                };
            });

        return account;
    }

    static async setNickname({ nickname, id }) {
        const affectedRows = await User.update(
            { nickname },
            { where: { id: id } },
        );

        return getQueryResultMsg({
            result: affectedRows,
            expectation: 1,
            entity: "별명",
            queryType: "수정",
        });
    }

    static async setIntro({ intro, id }) {
        const affectedRows = await User.update(
            { intro },
            { where: { id: id } },
        );

        return getQueryResultMsg({
            result: affectedRows,
            expectation: 1,
            entity: "자기소개글",
            queryType: "수정",
        });
    }

    static async deleteUser({ id }) {
        const deletedRow = User.destroy({ where: { id: id } });

        return getQueryResultMsg({
            result: deletedRow,
            expectation: 1,
            entity: "계정",
            queryType: "삭제",
        });
    }
    static async getUserInfo({ id }) {
        const result = User.findOne({ where: { id: id } });

        if (!result) {
            return { errorMessage: "해당 유저정보가 없습니다." };
        }

        return result;
    }
}

export { userService };
