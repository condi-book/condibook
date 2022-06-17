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
            result = await teamService.getTeamByName({ name });
        } else {
            result = await teamService.getTeamAll();
        }

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.get("/:id/info", async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await teamService.getTeamInfo({ id });

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

export { teamRouter };
