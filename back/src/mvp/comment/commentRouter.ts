import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { commentSerivce } from "./commentSerivce";

const commentRouter = Router();

commentRouter.post("/:post_id", loginRequired, async (req, res, next) => {
    try {
        const content = req.body.content;
        const user_id = req.current.user_id;
        const post_id = req.params.post_id; // 게시판 아이디

        const result = await commentSerivce.createComment({
            content,
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

commentRouter.get("/list/:post_id", async (req, res, next) => {
    try {
        const post_id = req.params.post_id;
        const result = await commentSerivce.getCommentList({ post_id });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

commentRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await commentSerivce.getComment({ id });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

commentRouter.put("/:id", loginRequired, async (req, res, next) => {
    try {
        const id = req.params.id; // 댓글아이디
        const user_id = req.current.user_id;
        const content = req.body.content;
        const result = await commentSerivce.updateComment({
            id,
            user_id,
            content,
        });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

commentRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const id = req.params.id; // 댓글아이디
        const user_id = req.current.user_id;
        const result = await commentSerivce.deleteComment({
            id,
            user_id,
        });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(204).json({ mse: "댓글 삭제 완료!" });
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
