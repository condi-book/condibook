import { Router } from "express";
import { bookmarkService } from "./bookmarkService";
import { websiteSerivce } from "../website/websiteSerivce";
import { folderService } from "../folder/folderService";
import { loginRequired } from "../../middlewares/loginRequired";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";

const bookmarkRouter = Router();

bookmarkRouter.post("/", loginRequired, async (req, res, next) => {
    try {
        const { url } = req.body;
        const { user_id } = req.current;

        // 웹사이트 생성(키워드, 이모지 생성 -> 미완)
        const website = await websiteSerivce.createWebsite(url);
        checkErrorMessage(website);

        // 폴더 생성(키워드 중에 단어 골라서 폴더이름으로 설정 -> 미완)
        const folder = await folderService.createFolder({
            title: "temporary folder title",
            explanation: "temporary folder explanation",
            user_id,
        });
        checkErrorMessage(folder);

        // 북마크 생성
        const result = await bookmarkService.createBookmark({
            website_id: website.id,
            folder_id: folder.id,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

// ========include 옵션 에러 발생=============
// bookmarkRouter.get("/:id", async (req, res, next) => {
//     try {
//         const { id } = req.params;

//         const result = await bookmarkService.getTheBookmark({ id });
//         checkErrorMessage(result);

//         res.status(200).send(result);
//     } catch (e) {
//         next(e);
//     }
// });

// ========include 옵션 에러 발생=============
// bookmarkRouter.get("", async (req, res, next) => {
//     try {
//         const { folder } = req.query;

//         const result = await bookmarkService.getBookmarksInTheFolder({
//             folder_id: folder,
//         });
//         checkErrorMessage(result);

//         res.status(200).send(result);
//     } catch (e) {
//         next(e);
//     }
// });

export { bookmarkRouter };
