import { Router } from "express";
import { folderService } from "./folderService";
import { bookmarkService } from "../bookmark/bookmarkService";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { loginRequired } from "../../middlewares/loginRequired";
import { websiteSerivce } from "../website/websiteSerivce";

const folderRouter = Router();

folderRouter.post("/:id/bookmarks", loginRequired, async (req, res, next) => {
    try {
        const folder_id = req.params.id;
        const { url } = req.body;
        const { user_id } = req.current;

        const website = await websiteSerivce.createWebsite({ url });
        checkErrorMessage(website);

        const bookmark = await bookmarkService.createBookmark({
            folder_id: folder_id,
            website_id: website.website.id,
            requester_id: user_id,
        });
        checkErrorMessage(bookmark);

        res.status(201).send(bookmark);
    } catch (e) {
        next(e);
    }
});

folderRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { owner } = req.query;
        const { team_id, title } = req.body;
        const { user_id } = req.current;

        let result;
        if (owner === "user") {
            result = await folderService.createFolderForUser({
                requester_id: user_id,
                title,
            });
        } else if (owner === "team") {
            result = await folderService.createFolderForTeam({
                requester_id: user_id,
                team_id,
                title,
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
        const { id } = req.params;

        const result = await folderService.getFolderInfo({ folder_id: id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

folderRouter.get("/:id/bookmarks", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = req.current;

        const result = await bookmarkService.getBookmarksInFolder({
            folder_id: id,
            requester_id: user_id,
        });
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
            folder_id: id,
            title,
            requester_id: user_id,
        });

        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

folderRouter.put(
    "/:id/bookmarks/order",
    loginRequired,
    async (req, res, next) => {
        try {
            const folder_id = req.params.id;
            const bookmarks = req.body;
            const { user_id } = req.current;

            const updatedBookmarks = await bookmarkService.updateBookmarkOrder({
                folder_id,
                requester_id: user_id,
                bookmarks,
            });
            checkErrorMessage(updatedBookmarks);

            res.status(201).send(updatedBookmarks);
        } catch (e) {
            next(e);
        }
    },
);

folderRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = req.current;

        const result = await folderService.deleteFolder({
            folder_id: id,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        res.status(204).json(result);
    } catch (e) {
        next(e);
    }
});

export { folderRouter };
