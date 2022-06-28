import {
    BMFavoriteModel,
    BookmarkModel,
    EmojiModel,
    KeywordModel,
    WebsiteModel,
} from "../schema";
import { Op } from "../../db";

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
                        { model: EmojiModel, attributes: ["emoji"] },
                    ],
                },
                { model: BMFavoriteModel },
            ],
            order: ["order_idx", "createdAt"],
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

    static destroyOne({ bookmark_id }) {
        return BookmarkModel.destroy({
            where: { id: bookmark_id },
        });
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
}

export { Bookmark };
