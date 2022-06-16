import { Router } from "express";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { websiteSerivce } from "./websiteSerivce";
const websiteRouter = Router();

websiteRouter.post("/", async (req, res, next) => {
    try {
        const url = req.body.url;
        const result = await websiteSerivce.createWebsite(url);
        //키워드 이모지 생성 부분
        /*
        const website_id = result.id;
        const ai_keyword = ai 에서 받아올 것
        const ai_emoji = ai 에서 받아올 것

        await websiteSerivce.createKeyword({
            website_id,
            ai_keyword,
        });
        await websiteSerivce.createEmoji({
            website_id,
            ai_emoji,
        });
        */
        // await ~ bookmark 생성 부분 필요

        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

websiteRouter.get("/list", async (req, res, next) => {
    try {
        const result = await websiteSerivce.getWebsiteList();

        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

websiteRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await websiteSerivce.getWebsite({ id });

        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

websiteRouter.put("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const { url, meta_title, meta_description } = req.body ?? null;

        const toUpdate = {
            url,
            meta_title,
            meta_description,
        };
        const update = await websiteSerivce.updateWebsite({ id, toUpdate });
        if (update.errorMessage) {
            throw new Error(update.errorMessage);
        }

        checkErrorMessage(update);

        res.status(201).send(update);
    } catch (error) {
        next(error);
    }
});

websiteRouter.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await websiteSerivce.deleteWebsite({ id });

        checkErrorMessage(result);

        res.status(204).send(result);
    } catch (error) {
        next(error);
    }
});
export { websiteRouter };
