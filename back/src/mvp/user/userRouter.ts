import { Router } from "express";
import { userService } from "./userService";
import { teamService } from "../team/teamService";
import { loginRequired } from "../../middlewares/loginRequired";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { folderService } from "../folder/folderService";
import { postService } from "../post/postService";

const userRouter = Router();

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

userRouter.post("/login/google", async (req, res, next) => {
    try {
        const { code } = req.body; // authorization code

        const token = await userService.getGoogleToken(code);
        checkErrorMessage(token);

        const account = await userService.getGoogleAccount(token);
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

        const result = await userService.getUserInfo({ user_id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.get("", loginRequired, async (req, res, next) => {
    try {
        const { nickname } = req.query;

        const result = await userService.getUsersInfo({ nickname });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.get("/teams", loginRequired, async (req, res, next) => {
    try {
        const { user_id } = req.current;

        const result = await teamService.getTeamInfoUserJoined({ user_id });
        checkErrorMessage(result);

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
        const { user_id } = req.current;

        const result = await userService.setNickname({
            nickname,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        const setNickname = await postService.setNickname({
            user_id,
            nickname,
        });
        checkErrorMessage(setNickname);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.put("/intro", loginRequired, async (req, res, next) => {
    try {
        const { intro } = req.body;
        const { user_id } = req.current;

        const result = await userService.setIntro({
            intro,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.delete("", loginRequired, async (req, res, next) => {
    try {
        const { user_id } = req.current;

        const result = await userService.deleteUser({ requester_id: user_id });
        checkErrorMessage(result);

        const setDelete = await postService.deletePosts({ user_id });
        checkErrorMessage(setDelete);

        res.status(204).send(result);
    } catch (e) {
        next(e);
    }
});

userRouter.get("/validation", loginRequired, async (req, res, next) => {
    try {
        const userInfo = req.current;
        if (!userInfo) {
            if (validation.errorMessage) {
                res.status(401).json({ mes: "검증실패", redirect: "주소~~" });
            }
        }
        const validation = await userService.validationUser({ userInfo });
        if (validation.errorMessage) {
            res.status(401).json({ mes: "검증실패", redirect: "주소~~" });
        }
        checkErrorMessage(validation);
        res.status(200).json(validation);
    } catch (e) {
        next(e);
    }
});

export { userRouter };
