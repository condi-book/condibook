import { Router } from "express";
import { boardSerivce } from "./boardService";
import { loginRequired } from "../../middlewares/loginRequired";
const boardRouter = Router();

boardRouter.post("/", loginRequired, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const views = 0;
        const toCreate = {
            title,
            content,
            views,
        };
        const result = await boardSerivce.createBoard({ toCreate });
        console.log(req.current);
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});
export { boardRouter };
