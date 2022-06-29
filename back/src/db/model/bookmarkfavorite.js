import { BMFavoriteModel } from "../schema";

class BMFavorite {
    static findOrCreate({ user_id, bookmark_id }) {
        return BMFavoriteModel.findOrCreate({
            where: { user_id: user_id, bookmark_id: bookmark_id },
        });
    }

    static destroyOne({ user_id, bookmark_id }) {
        return BMFavoriteModel.destroy({
            where: { user_id: user_id, bookmark_id: bookmark_id },
        });
    }
}

export { BMFavorite };
