// import { userRouter } from "./user/userRouter";
import { userRouter } from "./user/userRouter";
import { websiteRouter } from "./website/websiteRouter";
const indexRouter = (app) => {
    // app.use("/auth", userRouter);
    app.use("/user", userRouter);
    app.use("/website", websiteRouter)
};

export { indexRouter };
