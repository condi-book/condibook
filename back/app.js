import "dotenv/config";
import cors from "cors";
import express from "express";
import { sequelize } from "./src/db/schema/index.js";
import { redisClient } from "./src/db/redis/index.js";
import { indexRouter } from "./src/mvp/index.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import { PORT } from "./src/config";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
indexRouter(app);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Condibook AI Project." });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}✅`);

    // db
    try {
        sequelize.authenticate();
        console.log("DB 연결 성공✅");
    } catch (error) {
        console.error("DB 연결 실패❌", error);
    }

    // redis
    redisClient.client.on("ready", () => console.log("Redis 연결 성공✅"));
    redisClient.client.on("error", (err) =>
        console.log("Redis 연결 실패❌", err),
    );
});
