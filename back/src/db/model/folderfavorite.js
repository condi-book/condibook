import { FDFavoriteModel } from "../schema";

class FDFavorite {
    static findOrCreate({ user_id, folder_id }) {
        return FDFavoriteModel.findOrCreate({
            where: { user_id: user_id, folder_id: folder_id },
        });
    }
    static destroyOne({ user_id, folder_id }) {
        return FDFavoriteModel.destroy({
            where: { user_id: user_id, folder_id: folder_id },
        });
    }
}

export { FDFavorite };
