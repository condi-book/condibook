import { Router } from "express";
import { userService } from "./userService";

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

        const token = await userService.getKakaoToken(code);

        const account = await userService.getKakaoAccount(token);

        // 로그인 또는 사용자 생성
        const result = await userService.login(account);

        // 사용자 정보 + JWT 반환
        res.send(result);
    } catch (e) {
        next(e);
    }
});

export { userRouter };
