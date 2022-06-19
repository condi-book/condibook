import { userRouter } from "./user/userRouter";
import { websiteRouter } from "./website/websiteRouter";
import { bookmarkRouter } from "./bookmark/bookmarkRouter";
import { folderRouter } from "./folder/folderRouter";
import { postRouter } from "./post/postRouter";
import { commentRouter } from "./comment/commentRouter";
import { likeRouter } from "./like/likeRouter";
import { attachedRouter } from "./attached/attachedRouter";
const indexRouter = (app) => {
    app.use("/user", userRouter);
    app.use("/website", websiteRouter);
    app.use("/bookmarks", bookmarkRouter);
    app.use("/folders", folderRouter);
    app.use("/post", postRouter);
    app.use("/comment", commentRouter);
    app.use("/like", likeRouter);
    app.use("/attached", attachedRouter);
};

export { indexRouter };
