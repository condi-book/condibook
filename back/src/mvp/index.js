// import { userRouter } from "./user/userRouter";
import { userRouter } from "./user/userRouter";

const indexRouter = (app) => {
    // app.use("/auth", userRouter);
    app.use("/user", userRouter);
};

export { indexRouter };
