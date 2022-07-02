import { Router } from "express";
import { searchSerivce } from "./searchService";
import { loginRequired } from "../../middlewares/loginRequired";
const searchRouter = Router();

searchRouter.get("/community", async (req, res, next) => {
    try {
        const query = req.query.order;
        const pageNumber = req.query.pageNumber;
        const content = req.query.content;
        const type = req.query.type; // type = 0 only title, type = 1 title + content
        const postInfo = await searchSerivce.getPostByQuery({
            query,
            pageNumber,
            content,
            type,
        });
        if (postInfo.errorMessage) {
            throw new Error(postInfo.errorMessage);
        }
        res.status(200).send(postInfo);
    } catch (error) {
        next(error);
    }
});

searchRouter.get("/unified", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.current.user_id;
        const query = req.query.order;
        const pageNumber = req.query.pageNumber;
        const content = req.query.content;
        const type = 1;
        const postInfo = await searchSerivce.getPostByQuery({
            query,
            pageNumber,
            content,
            type,
        });
        if (postInfo.errorMessage) {
            throw new Error(postInfo.errorMessage);
        }
        const folderInfo = await searchSerivce.getFolderByQuery({
            user_id,
            pageNumber,
            content,
            type,
        });
        if (folderInfo.errorMessage) {
            throw new Error(folderInfo.errorMessage);
        }
        res.status(200).send({ postInfo, folderInfo });
    } catch (error) {
        next(error);
    }
});
export { searchRouter };
