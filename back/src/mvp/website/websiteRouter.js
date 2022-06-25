import { Router } from "express";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { loginRequired } from "../../middlewares/loginRequired";
import { folderService } from "../folder/folderService";
import { websiteSerivce } from "./websiteSerivce";

const websiteRouter = Router();

websiteRouter.post("/", loginRequired, async (req, res, next) => {
    try {
        const { url } = req.body;
        const { user_id } = req.current;

        // 폴더 이름 후보 1. 웹사이트 AI 키워드 1개
        let result = await websiteSerivce.createWebsite({ url });
        checkErrorMessage(result);
        // 폴더 이름 후보 2. 기존 폴더리스트
        const folders = await folderService.getUserFoldersInfo({ user_id });
        checkErrorMessage(folders);
        result["folders"] = folders;

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
