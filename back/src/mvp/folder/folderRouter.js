import { Router } from "express";
import { folderService } from "./folderService";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";
import { loginRequired } from "../../middlewares/loginRequired";

const folderRouter = Router();

// folderRouter.post("", async (req, res, next) => {
//     try {
//         const { title, explanation } = req.body;

//         const result = await folderService.createFolder({
//             title,
//             explanation,
//         });
//         checkErrorMessage(result);

//         res.status(201).send(result);
//     } catch (e) {
//         next(e);
//     }
// });

folderRouter.get("", loginRequired, async (req, res, next) => {
    try {
        const id = req.currentUserId;

        const result = await folderService.getMyFolders({ user_id: id });
        console.log(result);
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});
export { folderRouter };
