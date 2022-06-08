import { Router } from "express";
import { websiteSerivce } from "./websiteSerivce";


const websiteRouter = Router();

websiteRouter.post("/", async (req, res, next) => {
    try {
        const url  = req.body.url;

        const result = await websiteSerivce.createWebsite(url);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export { websiteRouter };
