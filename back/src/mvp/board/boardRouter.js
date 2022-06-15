import { Router } from "express";
import { boardSerivce } from "./boardService";
import { loginRequired } from "../../middlewares/loginRequired";
import { getUserIP } from "../../middlewares/getUserIP";

const boardRouter = Router();

boardRouter.post("/", loginRequired, async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const id = req.current.user_id;
        const views = 0;
        const toCreate = {
            title,
            content,
            views,
        };
        const result = await boardSerivce.createBoard({ toCreate, id });
        console.log(req.current);
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

boardRouter.get("/list", async (req, res, next) => {
    try {
        const result = await boardSerivce.getBoardList();
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

boardRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        if (req.cookies[id] == undefined) {
            // key, value, 옵션을 설정해준다.
            res.cookie(id, getUserIP(req), {
                // 유효시간 : 12분
                maxAge: 720000,
            });
            // 조회수 증가 쿼리
            await boardSerivce.updateViews({ id });
        }
        const result = await boardSerivce.getBoard({ id, req });
        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

boardRouter.put("/:id", loginRequired, async (req, res, next) => {
    try {
        const id = req.params.id;
        const user_id = req.current.user_id;
        const { title, content } = req.body ?? "";

        const toUpdate = {
            title,
            content,
        };
        const update = await boardSerivce.updateBoard({
            id,
            toUpdate,
            user_id,
        });
        if (update.errorMessage) {
            throw new Error(update.errorMessage);
        }
        const result = await boardSerivce.getBoard({ id });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});

boardRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const id = req.params.id;
        const user_id = req.current.user_id;
        const result = await boardSerivce.deleteBoard({ id, user_id });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(204).send("삭제가 완료되었습니다.");
    } catch (error) {
        next(error);
    }
});
export { boardRouter };
