import { CategoryModel } from "../schema";

class Category {
    static async create({ category }) {
        const result = await CategoryModel.create({ category });
        return result;
    }
    static findOneById({ category_id }) {
        return CategoryModel.findOne({
            where: { id: category_id },
            attribute: ["category"],
        });
    }
}

export { Category };
