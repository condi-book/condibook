import { Router } from "express";
import { searchSerivce } from "./searchService";
import { loginRequired } from "../../middlewares/loginRequired";
import { teamService } from "../team/teamService";
// import { elasticSearch } from "../../db/elasticsearch";
const searchRouter = Router();

searchRouter.get("/community", async (req, res, next) => {
    try {
        const query = req.query.order;
        const pageNumber = req.query.pageNumber ?? 1;
        const content = req.query.content;
        const type = req.query.type ?? 1; // type = 0 only title, type = 1 title + content
        // let info = null;
        // info = await elasticSearch.searchPost({ content, pageNumber });
        // const data = info.hits.hits;
        // const data2 = data.map((v) => {
        //     return v._source;
        // });
        const result = await searchSerivce.getPostByQuery({
            query,
            pageNumber,
            content,
            type,
        });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

searchRouter.get("/unified", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.current.user_id;
        const query = req.query.order;
        const pageNumber = req.query.pageNumber;
        const content = req.query.content;
        const type = 1;
        const postInfo = await searchSerivce.getPostByQuery({
            query,
            pageNumber,
            content,
            type,
        });
        if (postInfo.errorMessage) {
            throw new Error(postInfo.errorMessage);
        }
        const teamInfo = await teamService.getTeamInfoUserJoined({ user_id });
        const team_ids = teamInfo.map((v) => {
            return v.team_id;
        });
        const folderInfo = await searchSerivce.getFolderByQuery({
            user_id,
            pageNumber,
            content,
            type,
            team_ids,
        });
        if (folderInfo.errorMessage) {
            throw new Error(folderInfo.errorMessage);
        }
        res.status(200).send({ postInfo, folderInfo });
    } catch (error) {
        next(error);
    }
});
export { searchRouter };
