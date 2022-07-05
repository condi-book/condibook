import { FolderModel, sequelize, TeamModel, Op, Sequelize } from "../schema";

class Team {
    static create({ manager_id, name, explanation }) {
        return TeamModel.create({
            manager: manager_id,
            name: name,
            explanation: explanation,
        });
    }

    static findOne({ team_id }) {
        return TeamModel.findOne({ where: { id: team_id } });
    }

    static findAllWithFolderCnt() {
        return sequelize.query(
            `SELECT team.id as team_id, team.name, team.explanation, count(folder.id) as folder_count
        FROM ${TeamModel.tableName} AS team
            LEFT JOIN ${FolderModel.tableName} as folder
            ON team.id = folder.team_id
        GROUP BY team.id;`,
            { type: sequelize.QueryTypes.SELECT },
        );
    }
    static searchTeam({ user_id, offset, content }) {
        return FolderModel.findAll({
            attributes: ["id", "name", "explanation"],
            where: {
                [Op.and]: [
                    {
                        user_id: user_id,
                    },
                    {
                        name: {
                            [Op.like]: `%${content}%`,
                        },
                    },
                ],
            },
            order: [["createdAt", "DESC"]],
            offset: offset,
            limit: 20,
        });
    }
    static findAllByNameExplanation({ keyword }) {
        return TeamModel.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                    {
                        explanation: {
                            [Op.like]: `%${keyword}%`,
                        },
                    },
                ],
            },
        });
    }
    static searchTeamByQuery({ content, team_ids }) {
        return FolderModel.findAll({
            attributes: ["id", "title"],
            where: {
                [Op.and]: [
                    {
                        team_id: {
                            [Op.in]: [...team_ids],
                        },
                    },
                    Sequelize.literal(
                        "MATCH (`title`) AGAINST (:search IN NATURAL LANGUAGE MODE)",
                    ),
                ],
            },
            replacements: {
                search: content,
            },
            raw: true,
            nest: true,
        });
    }

    static updateInfo({ team_id, manager_id, name, explanation }) {
        return TeamModel.update(
            { name, explanation },
            { where: { id: team_id, manager: manager_id } },
        );
    }
    static destroyOne({ team_id }) {
        return TeamModel.destroy({
            where: { id: team_id },
        });
    }
}

export { Team };
