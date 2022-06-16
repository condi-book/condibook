import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { commentSerivce } from "./commentSerivce";

const commentRouter = Router();

commentRouter.post("/:board_id", loginRequired, async (req, res, next) => {
    try {
        const content = req.body.content;
        const user_id = req.current.user_id;
        const board_id = req.params.board_id; // 게시판 아이디

        console.log(board_id, user_id, content);
        const result = await commentSerivce.createComment({
            content,
            user_id,
            board_id,
        });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

commentRouter.get("/list/:board_id", async (req, res, next) => {
    try {
        const board_id = req.params.board_id;
        const result = await commentSerivce.getCommentList({ board_id });
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
        res.status(204).send(result);
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
