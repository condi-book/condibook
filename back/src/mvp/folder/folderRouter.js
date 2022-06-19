import { Router } from "express";
import { folderService } from "./folderService";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { loginRequired } from "../../middlewares/loginRequired";

const folderRouter = Router();

folderRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { owner } = req.query;
        const { team_id, title } = req.body;
        const { user_id } = req.current;

        let result;
        if (owner === "user") {
            result = await folderService.createFolderForUser({
                user_id,
                title,
            });
        } else if (owner === "team") {
            result = await folderService.createFolderForTeam({
                team_id,
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

folderRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params; // 폴더 아이디

        const result = await folderService.getFolderInfo({ id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

folderRouter.put("/:id", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const { user_id } = req.current;

        let result;
        result = await folderService.updateTitle({
            id,
            title,
            user_id,
        });
        // } else if (mode === "favorites") {
        //     const { user_id } = req.current;

        //     result = await folderService.updateFolderFavorites({
        //         id,
        //         user_id,
        //     });
        // }

        checkErrorMessage(result);

        res.status(201).send(result);
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

        res.status(204).json(result);
    } catch (e) {
        next(e);
    }
});

export { folderRouter };
