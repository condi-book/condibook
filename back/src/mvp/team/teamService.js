import { Team, User } from "../../db";
import { getFailMsg } from "../../util/message";

class teamService {
    static async createTeam({ manager, name, explanation }) {
        try {
            const user = await User.findOne({ where: { id: manager } });
            if (!user) {
                return getFailMsg({
                    entity: "매니저로 지정한 사용자",
                    action: "조회",
                });
            }

            const newTeam = await Team.create({
                manager: user.id,
                name,
                explanation,
            });

            return newTeam;
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { teamService };
