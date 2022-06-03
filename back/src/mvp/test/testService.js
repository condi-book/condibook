import { Test } from "../../db";

class testService {
    static async createTest({ name, email }) {
        const result = await Test.create({ name, email });
        return result;
    }
}

export { testService };
