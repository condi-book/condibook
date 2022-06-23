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

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

attachedRouter.get("/:post_id", loginRequired, async (req, res, next) => {
    try {
        const post_id = req.params.post_id; // 게시판 아이디

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

attachedRouter.post(
    "/update/:post_id",
    loginRequired,
    async (req, res, next) => {
        try {
            const post_id = req.params.post_id; // 게시판 아이디
            const bookmark_id = req.body.bookmark_id;
            const result = await attachedService.addAttached({
                post_id,
                bookmark_id,
            });

            if (result.errorMessage) {
                throw new Error(result.errorMessage);
            }

            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },
);
attachedRouter.delete(
    "/update/:post_id",
    loginRequired,
    async (req, res, next) => {
        try {
            const post_id = req.params.post_id; // 게시판 아이디
            const bookmark_id = req.body.bookmark_id;
            const result = await attachedService.deleteOneAttached({
                post_id,
                bookmark_id,
            });

            if (result.errorMessage) {
                throw new Error(result.errorMessage);
            }

            res.status(204).send(result);
        } catch (error) {
            next(error);
        }
    },
);

attachedRouter.delete("/:post_id", loginRequired, async (req, res, next) => {
    try {
        const post_id = req.params.post_id; // 게시판 아이디

        const result = await attachedService.deleteAttached({
            post_id,
        });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(204).send(result);
    } catch (error) {
        next(error);
    }
});

export { attachedRouter };
