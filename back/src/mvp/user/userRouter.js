import { Router } from "express";
import { userService } from "./userService";

const userRouter = Router();

userRouter.post("/login/google", async (req, res, next) => {
    try {
        const { nickname, email, image_url } = req.body;

        const result = await userService.googleLogin({
            nickname,
            email,
            image_url,
        });

        res.send(result);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
