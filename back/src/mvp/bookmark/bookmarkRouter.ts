import { Router } from "express";
import { bookmarkService } from "./bookmarkService";
import { loginRequired } from "../../middlewares/loginRequired";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { folderService } from "../folder/folderService";

const bookmarkRouter = Router();

bookmarkRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { folder_name, folder_id, website_id } = req.body; // folder_name or folder_id
        const { user_id } = req.current;

        // 북마크를 새 폴더에 저장하는 경우
        let newFolder;
        if (folder_name) {
            newFolder = await folderService.createFolderForUser({
                requester_id: user_id,
                title: folder_name,
            });
        }
        // 북마크 생성
        const result = await bookmarkService.createBookmark({
            folder_id: folder_id ?? newFolder.id,
            website_id,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

bookmarkRouter.get("/:id", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = req.current;

        const result = await bookmarkService.getBookmark({
            bookmark_id: id,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

bookmarkRouter.put("/:id", loginRequired, async (req, res, next) => {
    try {
        const bookmark_id = req.params.id;
        const folder_id = req.body.folder_id;
        const requester_id = req.current.user_id;

        const result = await bookmarkService.changeFolder({
            bookmark_id,
            folder_id,
            requester_id,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

bookmarkRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = req.current;

        const result = await bookmarkService.deleteBookmark({
            bookmark_id: id,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        res.status(204).json(result);
    } catch (e) {
        next(e);
    }
});

export { bookmarkRouter };
