import {
    FolderModel,
    sequelize,
    BookmarkModel,
    FDFavoriteModel,
} from "../schema";

class Folder {
    static createForUser({ user_id, title }) {
        return FolderModel.create({ user_id: user_id, title: title });
    }

    static createForTeam({ team_id, title }) {
        return FolderModel.create({ team_id: team_id, title: title });
    }

    static findOne({ folder_id }) {
        return FolderModel.findOne({ where: { id: folder_id } });
    }

    static findOneByFolderIdUserId({ folder_id, user_id }) {
        return FolderModel.findOne({
            where: { id: folder_id, user_id: user_id },
        });
    }
    static findOneOnlyIdTitle({ folder_id }) {
        return FolderModel.findOne({
            where: { id: folder_id },
            attributes: ["id", "title"],
        });
    }
    static findAllOnlyIdTitle({ user_id }) {
        return FolderModel.findAll({
            attributes: ["id", "title"],
            where: { user_id: user_id },
            order: ["createdAt"],
        });
    }
    static findAllOnlyId({ user_id }) {
        return FolderModel.findAll({
            where: { user_id },
            attributes: ["id"],
            raw: true,
        });
    }
    static findAllWithBookmarkFDFavorite({ user_id }) {
        return sequelize.query(
            `SELECT folder.id, folder.title, folder.createdAt, folder.updatedAt, count(bookmark.id) as bookmark_count, CASE WHEN fdfavorite.id IS NULL THEN false ELSE true END favorites
            FROM (SELECT * FROM ${FolderModel.tableName} WHERE ${FolderModel.tableName}.user_id = ${user_id}) AS folder
            LEFT JOIN ${BookmarkModel.tableName} AS bookmark
            ON folder.id = bookmark.folder_id
            LEFT JOIN ${FDFavoriteModel.tableName} AS fdfavorite
            ON folder.id = fdfavorite.folder_id
            GROUP BY folder.id, fdfavorite.id
            ORDER BY fdfavorite.createdAt DESC, folder.createdAt ASC;`,
            { type: sequelize.QueryTypes.SELECT },
        );
    }
    static findAllWithBookmarkFDFavoriteByTeamIdUserId({ team_id, user_id }) {
        return sequelize.query(
            `SELECT folder.id, folder.title, folder.createdAt, folder.updatedAt, count(bookmark.id) as bookmark_count, CASE WHEN fdfavorite.id IS NULL THEN false ELSE true END favorites
            FROM (SELECT * FROM ${FolderModel.tableName} WHERE ${FolderModel.tableName}.team_id = ${team_id}) AS folder
            LEFT JOIN ${BookmarkModel.tableName} AS bookmark
            ON folder.id = bookmark.folder_id
            LEFT JOIN ${FDFavoriteModel.tableName} AS fdfavorite
            ON folder.id = fdfavorite.folder_id and fdfavorite.user_id = ${user_id}
            GROUP BY folder.id, fdfavorite.id
            ORDER BY fdfavorite.createdAt DESC, folder.createdAt ASC;`,
            { type: sequelize.QueryTypes.SELECT },
        );
    }

    static updateTitle({ folder_id, title }) {
        return FolderModel.update({ title }, { where: { id: folder_id } });
    }

    static destroyOne({ folder_id, user_id }) {
        return FolderModel.destroy({
            where: { id: folder_id, user_id: user_id },
        });
    }
}

export { Folder };
