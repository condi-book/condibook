import { Router } from "express";
import { postService } from "./postService";
import { loginRequired } from "../../middlewares/loginRequired";
import { getUserIP } from "../../util/getUserIP/getUserIP.js";
import { attachedService } from "../attached/attachedService";
const postRouter = Router();

postRouter.post("/", loginRequired, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const { bookmark_id } = req.body;
        const user_id = req.current.user_id;
        const views = 0;
        const toCreate = {
            title,
            content,
            views,
        };
        const postInfo = await postService.createPost({ toCreate, user_id });
        if (postInfo.errorMessage) {
            throw new Error(postInfo.errorMessage);
        }
        const post_id = postInfo.id;
        const attachedInfo = await attachedService.createAttached({
            user_id,
            post_id,
            bookmark_id,
        });
        if (attachedInfo.errorMessage) {
            throw new Error(postInfo.errorMessage);
        }

        res.status(201).send(postInfo);
    } catch (error) {
        next(error);
    }
});

postRouter.get("/list", async (req, res, next) => {
    try {
        const query = req.query.order;
        const pageNumber = req.query.pageNumber;
        const result = await postService.getPostList({ query, pageNumber });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

postRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await postService.getPost({ id, req });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        if (req.cookies[id] == undefined) {
            // key, value, 옵션을 설정해준다.
            res.cookie(id, getUserIP(req), {
                // 유효시간 : 12분
                maxAge: 720000,
            });
            // 조회수 증가 쿼리
            await postService.updateViews({ id });
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

postRouter.put("/:id", loginRequired, async (req, res, next) => {
    try {
        const id = req.params.id;
        const user_id = req.current.user_id;
        const { title, content, bookmark_id } = req.body ?? "";

        const toUpdate = {
            title,
            content,
        };
        const update = await postService.updatePost({
            id,
            toUpdate,
            user_id,
            bookmark_id,
        });
        if (update.errorMessage) {
            throw new Error(update.errorMessage);
        }
        res.status(201).send(update);
    } catch (error) {
        next(error);
    }
});

postRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const id = req.params.id;
        const user_id = req.current.user_id;

        const deletePost = await postService.deletePost({ id, user_id });
        if (deletePost.errorMessage) {
            throw new Error(deletePost.errorMessage);
        }
        res.status(204).json({ msg: "삭제 완료!" });
    } catch (error) {
        next(error);
    }
});
export { postRouter };
