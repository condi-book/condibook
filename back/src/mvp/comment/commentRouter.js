import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { commentSerivce } from "./commentSerivce";

const commentRouter = Router();

commentRouter.post("/:id", loginRequired, async (req, res, next) => {
    try {
        const content = req.body.content;
        const user_id = req.current.user_id;
        const board_id = req.params.id;

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

export { commentRouter };
