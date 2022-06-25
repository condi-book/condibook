import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { favoriteService } from "./favoriteService";

const favoriteRouter = Router();

favoriteRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { object, id } = req.query;
        const { user_id } = req.current;

        let result;
        if (object === "folder") {
            result = await favoriteService.createFolderFavorites({
                folder_id: id,
                requester_id: user_id,
            });
        } else if (object === "bookmark") {
            result = await favoriteService.createBookmarkFavorites({
                bookmark_id: id,
                requester_id: user_id,
            });
        }
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        return next(e);
    }
});

favoriteRouter.delete("", loginRequired, async (req, res, next) => {
    try {
        const { object, id } = req.query;
        const { user_id } = req.current;

        let result;
        if (object === "folder") {
            result = await favoriteService.deleteFolderFavorites({
                folder_id: id,
                requester_id: user_id,
            });
        } else if (object === "bookmark") {
            result = await favoriteService.deleteBookmarkFavorites({
                bookmark_id: id,
                requester_id: user_id,
            });
        }
        checkErrorMessage(result);

        res.status(204).send();
    } catch (e) {
        return next(e);
    }
});

export { favoriteRouter };
