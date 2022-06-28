import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { likeService } from "./likeService";

const likeRouter = Router();

likeRouter.post("/:post_id", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.current.user_id;
        const post_id = req.params.post_id; // 게시판 아이디

        const result = await likeService.createLike({
            user_id,
            post_id,
        });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

likeRouter.get("/list/user_id", async (req, res, next) => {
    try {
        const user_id = req.params.user_id; // parmas_user_id 가 좋아하는 목록

        const result = await likeService.getOtherLike({
            user_id,
        });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

likeRouter.get("/", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.current.user_id; // 나의 좋아요 목록 (로그인 필요)

        const result = await likeService.getMyLike({
            user_id,
        });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

likeRouter.delete("/:post_id", loginRequired, async (req, res, next) => {
    try {
        const post_id = req.params.post_id; // 게시판 아이디
        const user_id = req.current.user_id;
        const result = await likeService.deleteLike({
            post_id,
            user_id,
        });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(204).json({ mes: "좋아요 삭제 완료!" });
    } catch (error) {
        next(error);
    }
});

export { likeRouter };
