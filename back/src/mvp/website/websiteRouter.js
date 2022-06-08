import { Router } from "express";
import { websiteSerivce } from "./websiteSerivce";

const websiteRouter = Router();

websiteRouter.post("/", (req, res, next) => {
    try {
        const { url } = req.body;

        const result = websiteSerivce.createWebsite({ url });

        res.send(result);
    } catch (error) {
        next(error);
    }
});

export { websiteRouter };
