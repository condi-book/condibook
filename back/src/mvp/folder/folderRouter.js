import { Router } from "express";
import { folderService } from "./folderService";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { loginRequired } from "../../middlewares/loginRequired";

const folderRouter = Router();

folderRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { title, explanation } = req.body;
        const id = req.currentUserId;

        const result = await folderService.createFolder({
            title,
            explanation,
            user_id: id,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

folderRouter.get("", loginRequired, async (req, res, next) => {
    try {
        const id = req.currentUserId;

        const result = await folderService.getMyFolders({ user_id: id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

folderRouter.put("/:id", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { mode } = req.query;

        let result;
        if (mode === "info") {
            const { title, explanation } = req.body;

            result = await folderService.updateFolderInfo({
                id,
                title,
                explanation,
            });
        } else if (mode === "favorites") {
            const user_id = req.currentUserId;

            result = await folderService.updateFolderFavorites({
                id,
                user_id,
            });
        }

        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

folderRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const user_id = req.currentUserId;

        const result = await folderService.deleteFolder({ id, user_id });
        checkErrorMessage(result);

        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
});

export { folderRouter };
