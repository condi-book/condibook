import { Router } from "express";
import { websiteSerivce } from "./websiteSerivce";


const websiteRouter = Router();

websiteRouter.post("/", (req, res, next) => {
    try {
        const url  = req.body.url;

        const result = websiteSerivce.createWebsite(url);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export { websiteRouter };
