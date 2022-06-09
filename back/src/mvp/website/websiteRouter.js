import { Router } from "express";
import { websiteSerivce } from "./websiteSerivce";


const websiteRouter = Router();

websiteRouter.post("/", async (req, res, next) => {
    try {
        const url  = req.body.url;
        const result = await websiteSerivce.createWebsite(url);

        if(result.errorMessage){
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

websiteRouter.get("/list", async (req, res, next) => {
    try {
        const result = await websiteSerivce.getWebsiteList();

        if(result.errorMessage){
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

websiteRouter.get("/:id", async (req, res, next) => {
    try {
        
        const id  = req.params.id;
        const result = await websiteSerivce.getWebsite({id});

        if(result.errorMessage){
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

export { websiteRouter };
