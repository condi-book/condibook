import {
    BMFavoriteModel,
    BookmarkModel,
    CategoryModel,
    KeywordModel,
    WebsiteModel,
    AttachedModel,
    sequelize,
    Transaction,
} from "../schema";
import { Op } from "..";

class Bookmark {
    static create({ website_id, folder_id }) {
        return BookmarkModel.create({
            website_id: website_id,
            folder_id: folder_id,
        });
    }

    static findOne({ bookmark_id }) {
        return BookmarkModel.findOne({ where: { id: bookmark_id } });
    }

    static findOneWithWebsite({ folder_id }) {
        return BookmarkModel.findOne({
            where: { folder_id },
            include: [WebsiteModel],
            raw: true,
            nest: true,
        });
    }

    static findAll({ folder_id, website_id }) {
        return BookmarkModel.findAll({
            where: { folder_id: folder_id, website_id: website_id },
        });
    }

    static findAllWithWebsite({ folder_id }) {
        return BookmarkModel.findAll({
            where: { folder_id: folder_id },
            attributes: [["id", "bookmark_id"], "order_idx"],
            include: [
                {
                    model: WebsiteModel,
                    attributes: [
                        ["id", "website_id"],
                        "url",
                        "meta_title",
                        "meta_description",
                        "img",
                    ],
                    include: [
                        { model: KeywordModel, attributes: ["keyword"] },
                        { model: CategoryModel, attributes: ["category"] },
                    ],
                },
                { model: BMFavoriteModel },
            ],
            order: [
                sequelize.fn("isnull", sequelize.col("order_idx")),
                "order_idx",
                "createdAt",
            ],
            nest: true,
            raw: true,
        });
    }

    static findOneWithWebsiteFavoriteByBookmarkId({ bookmark_id }) {
        return BookmarkModel.findAll({
            where: { id: bookmark_id },
            attributes: [["id", "bookmark_id"], "order_idx"],
            include: [
                {
                    model: WebsiteModel,
                    attributes: [
                        ["id", "website_id"],
                        "url",
                        "meta_title",
                        "meta_description",
                        "img",
                    ],
                    include: [
                        { model: KeywordModel, attributes: ["keyword"] },
                        { model: CategoryModel, attributes: ["category"] },
                    ],
                },
                { model: BMFavoriteModel },
            ],
            order: [
                sequelize.fn("isnull", sequelize.col("order_idx")),
                "order_idx",
                "createdAt",
            ],
            nest: true,
            raw: true,
        });
    }

    static countAllInFolders({ folder_ids }) {
        return BookmarkModel.count({
            where: { folder_id: folder_ids },
        }); // 폴더 id 중 하나라도 맞다면 (배열로 in 연산자 사용) 반환
    }

    static bulkUpdateOrderIdx({ bookmarks }) {
        return BookmarkModel.bulkCreate(bookmarks, {
            updateOnDuplicate: ["order_idx"],
        });
    }

    static updateFolderId({ bookmark_id, folder_id }) {
        return BookmarkModel.update(
            { folder_id },
            { where: { id: bookmark_id } },
        );
    }

    static findWithBookmarkId({ bookmark_id }) {
        return BookmarkModel.findAll({
            where: {
                id: {
                    [Op.in]: bookmark_id,
                },
            },
            raw: true,
            nest: true,
        });
    }

    static async destroyOne({ bookmark_id }) {
        try {
            await sequelize.transaction(
                {
                    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
                },
                // eslint-disable-next-line no-unused-vars
                async (t) => {
                    if (bookmark_id) {
                        const check = await AttachedModel.findAll({
                            where: { bookmark_id: bookmark_id },
                        });
                        if (check) {
                            await AttachedModel.destroy({
                                where: {
                                    bookmark_id: bookmark_id,
                                },
                            });
                        }
                        return await BookmarkModel.destroy({
                            where: { id: bookmark_id },
                        });
                    }
                },
            );
        } catch (e) {
            return { errorMessage: e };
        }
    }
}

export { Bookmark };
