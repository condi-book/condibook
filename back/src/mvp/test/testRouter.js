import { Router } from "express";
import { testService } from "./testService";

const testRouter = Router();
testRouter.post("/create", (req, res, next) => {
    try {
        const { name, email } = req.body;
        const result = testService.createTest({ name, email });
        res.send(result);
    } catch (error) {
        next(error);
    }
});

export { testRouter };
