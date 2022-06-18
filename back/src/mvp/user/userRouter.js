import { Router } from "express";
import { userService } from "./userService";
import { teamService } from "../team/teamService";
import { loginRequired } from "../../middlewares/loginRequired";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { folderService } from "../folder/folderService";

const userRouter = Router();

userRouter.post("/login/google", async (req, res, next) => {
    try {
        const { nickname, email, image_url } = req.body;

        const result = await userService.login({
            nickname,
            email,
            image_url,
        });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

userRouter.post("/login/kakao", async (req, res, next) => {
    try {
        const { code } = req.body; // authorization code

        const token = await userService.getKakaoToken(code);
        checkErrorMessage(token);

        const account = await userService.getKakaoAccount(token);
        checkErrorMessage(account);

        // 로그인 또는 사용자 생성
        const result = await userService.login(account);
        checkErrorMessage(result);

        // 사용자 정보 + JWT 반환
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.get("/info", loginRequired, async (req, res, next) => {
    try {
        const { user_id } = req.current;

        const result = await userService.getUserInfo({ id: user_id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.get("/teams", loginRequired, async (req, res, next) => {
    try {
        const { user_id } = req.current;

        const result = await teamService.getTeam({ user_id });
        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.get("/folders", loginRequired, async (req, res, next) => {
    try {
        const { user_id } = req.current;

        const result = await folderService.getUserFolders({ user_id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.put("/nickname", loginRequired, async (req, res, next) => {
    try {
        const { nickname } = req.body;
        const id = req.current.user_id;

        const result = await userService.setNickname({ nickname, id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.put("/intro", loginRequired, async (req, res, next) => {
    try {
        const { intro } = req.body;
        const id = req.current.user_id;

        const result = await userService.setIntro({ intro, id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.delete("", loginRequired, async (req, res, next) => {
    try {
        const id = req.current.user_id;

        const result = await userService.deleteUser({ id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

export { userRouter };
