import { userRouter } from "./user/userRouter";

const indexRouter = (app) => {
    app.use("/auth", userRouter);
};

export { indexRouter };
