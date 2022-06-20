import { Router } from "express";
import { attachedService } from "./attachedService";
import { loginRequired } from "../../middlewares/loginRequired";
const attachedRouter = Router();

attachedRouter.post("/:post_id", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.current.user_id;
        const post_id = req.params.post_id; // 게시판 아이디

        const result = await attachedService.createAttached({
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
attachedRouter.get("/:post_id", loginRequired, async (req, res, next) => {
    try {
        const post_id = req.params.post_id; // 첨부북마크 아이디

        const result = await attachedService.getAttached({
            post_id,
        });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

export { attachedRouter };
