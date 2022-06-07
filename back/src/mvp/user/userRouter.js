import { Router } from "express";
import { userService } from "./userService";

const userRouter = Router();

userRouter.post("/login", (req, res, next) => {
    try {
        const { nickname, email, image_url } = req.body;

        const result = userService.createUser({ nickname, email, image_url });

        res.send(result);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
