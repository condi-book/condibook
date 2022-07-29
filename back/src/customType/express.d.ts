import userModel from "../db/schema/";

declare global {
    namespace Express {
        interface Request {
            current?: userModel;
        }
    }
}
