import { userRouter } from "./user/userRouter";
import { websiteRouter } from "./website/websiteRouter";
import { boardRouter } from "./board/boardRouter";

const indexRouter = (app) => {
    app.use("/user", userRouter);
    app.use("/website", websiteRouter);
    app.use("/board", boardRouter);
};

export { indexRouter };
