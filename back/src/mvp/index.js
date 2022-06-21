import { userRouter } from "./user/userRouter";
import { websiteRouter } from "./website/websiteRouter";
import { bookmarkRouter } from "./bookmark/bookmarkRouter";
import { folderRouter } from "./folder/folderRouter";
import { postRouter } from "./post/postRouter";
import { commentRouter } from "./comment/commentRouter";
import { teamRouter } from "./team/teamRouter";
import { likeRouter } from "./like/likeRouter";
import { attachedRouter } from "./attached/attachedRouter";
import { favoriteRouter } from "./favorite/favoriteRouter";

const indexRouter = (app) => {
    app.use("/user", userRouter);
    app.use("/website", websiteRouter);
    app.use("/bookmarks", bookmarkRouter);
    app.use("/folders", folderRouter);
    app.use("/post", postRouter);
    app.use("/comment", commentRouter);
    app.use("/teams", teamRouter);
    app.use("/like", likeRouter);
    app.use("/attached", attachedRouter);
    app.use("/favorites", favoriteRouter);
};

export { indexRouter };
