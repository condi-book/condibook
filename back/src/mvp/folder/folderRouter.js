import { Router } from "express";
import { folderService } from "./folderService";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";

const folderRouter = Router();

folderRouter.post("", async (req, res, next) => {
    try {
        const { title, explanation } = req.body;

        const result = await folderService.createFolder({
            title,
            explanation,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

export { folderRouter };
