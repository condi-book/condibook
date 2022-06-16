import "dotenv/config";
import cors from "cors";
import express from "express";
import { sequelize } from "./src/db/index.js";
import { indexRouter } from "./src/mvp/index.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
indexRouter(app);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to 'Condibook'AI Project." });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);

    // DB 연결 확인
    try {
        sequelize.authenticate();
        console.log("DB 연결 성공✅");
    } catch (error) {
        console.error("DB 연결 실패", error);
        // if (error.original.errno == 1049) {
        // }
    }
});
