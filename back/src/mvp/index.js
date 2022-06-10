import { userRouter } from "./user/userRouter";
import { websiteRouter } from "./website/websiteRouter";

const indexRouter = (app) => {
    app.use("/user", userRouter);
    app.use("/website", websiteRouter);
};

export { indexRouter };
