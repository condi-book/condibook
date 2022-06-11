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

        res.status(201).send(result);
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

websiteRouter.put("/:id", async (req, res, next) => {
    try {
        const id  = req.params.id;
        const {url, meta_title, meta_description} = req.body ?? "" ;

        const toUpdate = {
            url,
            meta_title,
            meta_description
        };
        await websiteSerivce.updateWebsite({id, toUpdate});

        const result = await websiteSerivce.getWebsite({id});

        if(result.errorMessage){
            throw new Error(result.errorMessage);
        };

        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

websiteRouter.delete("/:id", async (req, res, next) => {
    try {
        
        const id  = req.params.id;
        const result = await websiteSerivce.deleteWebsite({id});

        if(result.errorMessage){
            throw new Error(result.errorMessage);
        }

        res.status(204).send(result);
    } catch (error) {
        next(error);
    }
});
export { websiteRouter };
