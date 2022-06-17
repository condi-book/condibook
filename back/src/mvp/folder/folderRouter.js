import { Router } from "express";
import { folderService } from "./folderService";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { loginRequired } from "../../middlewares/loginRequired";

const folderRouter = Router();

folderRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { owner } = req.query;
        const { id, title } = req.body; // id는 팀아이디이자 유저아이디
        const { user_id } = req.current;

        let result;
        if (owner === "user") {
            result = await folderService.createFolderForUser({
                user_id,
                title,
            });
        } else if (owner === "team") {
            result = await folderService.createFolderForTeam({
                team_id: id,
                title,
                user_id,
            });
        }
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

folderRouter.get("", loginRequired, async (req, res, next) => {
    try {
        const { user_id } = req.current;

        const result = await folderService.getMyFolders({ user_id });
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
            const { title } = req.body;

            result = await folderService.updateFolderInfo({
                id,
                title,
            });
        } else if (mode === "favorites") {
            const { user_id } = req.current;

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
        const { user_id } = req.current;

        const result = await folderService.deleteFolder({ id, user_id });
        checkErrorMessage(result);

        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
});

export { folderRouter };
