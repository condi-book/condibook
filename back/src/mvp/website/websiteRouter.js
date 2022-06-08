import { Router } from "express";
import { websiteSerivce } from "./websiteSerivce";

const websiteRouter = Router();

websiteRouter.post("/", (req, res, next) => {
    try {
        const object  = req.body.url;
        const url = JSON.stringify(object)

        const result = websiteSerivce.createWebsite({ url });

        res.send(result);
    } catch (error) {
        next(error);
    }
});

export { websiteRouter };
