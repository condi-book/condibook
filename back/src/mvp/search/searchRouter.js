import { Router } from "express";
import { searchSerivce } from "./searchService";
const searchRouter = Router();

searchRouter.get("/community", async (req, res, next) => {
    try {
        const query = req.query.order;
        const pageNumber = req.query.pageNumber;
        const content = req.query.content ?? "";
        const result = await searchSerivce.getPostByQuery({
            query,
            pageNumber,
            content,
        });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

export { searchRouter };
