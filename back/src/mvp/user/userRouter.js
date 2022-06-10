import { Router } from "express";
import { userService } from "./userService";
import axios from "axios";

const userRouter = Router();

userRouter.post("/login/google", async (req, res, next) => {
    try {
        const { nickname, email, image_url } = req.body;

        const result = await userService.login({
            nickname,
            email,
            image_url,
        });

        res.send(result);
    } catch (error) {
        next(error);
    }
});

userRouter.post("/login/kakao", async (req, res, next) => {
    try {
        const { code } = req.body; // authorization code

        // 코드로 토큰 발급
        const responseToken = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            new URLSearchParams({
                grant_type: "authorization_code",
                client_id: process.env.KAKAO_CLIENT_ID,
                redirect_uri: process.env.CLIENT_URL + "/callback/login/kakao",
                code: code,
            }),
        );
        const token = responseToken.data.access_token;

        // 토큰으로 사용자 정보 조회
        const responseAccount = await axios
            .get("https://kapi.kakao.com/v2/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                return res.data;
            });

        // 로그인 또는 사용자 생성
        const result = await userService.login({
            nickname: responseAccount.properties.nickname,
            email: responseAccount.kakao_account.email,
            image_url: responseAccount.properties.profile_image,
        });

        // 사용자 정보 + JWT 반환
        res.send(result);
    } catch (e) {
        next(e);
    }
});

export { userRouter };
