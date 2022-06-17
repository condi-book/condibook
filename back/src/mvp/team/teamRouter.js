import { Router } from "express";
import { teamService } from "./teamService";
import { loginRequired } from "../../middlewares/loginRequired";

const teamRouter = Router();

teamRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { name, explanation } = req.body;
        const { user_id } = req.current;

        const result = await teamService.createTeam({
            manager: user_id,
            name,
            explanation,
        });

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.get("", async (req, res, next) => {
    try {
        const { name } = req.query;

        let result;
        if (name) {
            result = await teamService.findTeamByName({ name });
        } else {
            result = await teamService.findTeamAll();
        }

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

export { teamRouter };
