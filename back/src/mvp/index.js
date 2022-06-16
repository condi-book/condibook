import { userRouter } from "./user/userRouter";
import { websiteRouter } from "./website/websiteRouter";
import { bookmarkRouter } from "./bookmark/bookmarkRouter";
import { folderRouter } from "./folder/folderRouter";
import { boardRouter } from "./board/boardRouter";
import { commentRouter } from "./comment/commentRouter";
const indexRouter = (app) => {
    app.use("/user", userRouter);
    app.use("/website", websiteRouter);
    app.use("/bookmarks", bookmarkRouter);
    app.use("/folders", folderRouter);
    app.use("/board", boardRouter);
    app.use("/comment", commentRouter);
};

export { indexRouter };
