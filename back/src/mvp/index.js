// import { userRouter } from "./user/userRouter";
import { testRouter } from "./test/testRouter";
const indexRouter = (app) => {
    // app.use("/auth", userRouter);
    app.use("/test", testRouter);
};

export { indexRouter };
