import { Router } from "express";
import { teamService } from "./teamService";
import { loginRequired } from "../../middlewares/loginRequired";
import { checkErrorMessage } from "../../middlewares/errorMiddleware";

const teamRouter = Router();

teamRouter.post("", loginRequired, async (req, res, next) => {
    try {
        const { name, explanation } = req.body;
        const { user_id } = req.current;

        const result = await teamService.createTeam({
            manager_id: user_id,
            name,
            explanation,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.post("/:id/members", loginRequired, async (req, res, next) => {
    try {
        const { user_id } = req.current;
        const { invitee_id } = req.body;
        const { id } = req.params;

        const result = await teamService.createMembership({
            host_id: user_id,
            invitee_id: invitee_id,
            team_id: id,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.get("", async (req, res, next) => {
    try {
        const { search } = req.query;

        let result;
        if (search) {
            result = await teamService.searchTeam({ keyword: search });
        } else {
            result = await teamService.getTeamAll();
        }
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.get("/:id/members", async (req, res, next) => {
    try {
        const team_id = req.params.id;

        const result = await teamService.getTeamMembers({ team_id });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.get("/:id/folders", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = req.current;

        const result = await teamService.getTeamFolders({
            team_id: id,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        res.status(200).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.put("/:id/info", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, explanation } = req.body;
        const { user_id } = req.current;

        const result = await teamService.updateTeamInfo({
            team_id: id,
            requester_id: user_id,
            name,
            explanation,
        });
        checkErrorMessage(result);

        res.status(201).send(result);
    } catch (e) {
        next(e);
    }
});

teamRouter.delete(
    "/:teamId/members/:memberId",
    loginRequired,
    async (req, res, next) => {
        try {
            const { teamId, memberId } = req.params;
            const { user_id } = req.current;

            const result = await teamService.deleteMemeber({
                team_id: teamId,
                member_id: memberId,
                requester_id: user_id,
            });
            checkErrorMessage(result);

            res.status(204).send(result);
        } catch (e) {
            next(e);
        }
    },
);

teamRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user_id } = req.current;

        const result = await teamService.deleteTeam({
            team_id: id,
            requester_id: user_id,
        });
        checkErrorMessage(result);

        res.status(204).send();
    } catch (e) {
        next(e);
    }
});

export { teamRouter };
