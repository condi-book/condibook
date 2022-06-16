import { Router } from "express";
import { attachedService } from "./attachedService";
import { loginRequired } from "../../middlewares/loginRequired";
const attachedRouter = Router();

attachedRouter.post("/:board_id", loginRequired, async (req, res, next) => {
    try {
        const content = req.body.content;
        const user_id = req.current.user_id;
        const board_id = req.params.board_id; // 게시판 아이디

        console.log(board_id, user_id, content);
        const result = await attachedService.createComment({
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

export { attachedRouter };
