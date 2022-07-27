import { Express } from "express";
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
import { searchRouter } from "./search/searchRouter";
const indexRouter = (app: Express): void => {
    app.use("/user", userRouter);
    app.use("/websites", websiteRouter);
    app.use("/bookmarks", bookmarkRouter);
    app.use("/folders", folderRouter);
    app.use("/posts", postRouter);
    app.use("/comments", commentRouter);
    app.use("/teams", teamRouter);
    app.use("/likes", likeRouter);
    app.use("/attached", attachedRouter);
    app.use("/favorites", favoriteRouter);
    app.use("/search", searchRouter);
};

export { indexRouter };
