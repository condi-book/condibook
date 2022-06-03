// import mongoose from "mongoose";
// import { User } from "./user/user.model";

// const DB_URL =
//     process.env.MONGODB_URL ||
//     "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

// mongoose.connect(DB_URL);
// const db = mongoose.connection;

// db.on("connected", () =>
//     console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL),
// );
// db.on("error", (error) =>
//     console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error),
// );

// export { User };

import { Sequelize, DataTypes } from "sequelize";

import mysql from "mysql2/promise";

async function createDB() {
    try {
        const connection = await mysql.createConnection(process.env.MYSQL_URI);
        await connection
            .query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`)
            .then(console.log("다시 실행해주세요."));
    } catch (e) {
        console.log(e);
    }
}

// sequelize 인스턴스 생성
const sequelize = new Sequelize(process.env.MYSQL_URI, {
    dialect: "mysql",
    logging: console.log, // Logging (디폴트 설정임)
    define: {
        freezeTableName: true, // 모델과 테이블명 동일시 (전역적 설정)
    },
});

// DB 연결 확인
try {
    sequelize.authenticate().then(console.log("DB 연결 성공✅"));
} catch (error) {
    console.error("DB 연결 실패", error);
    if (error.original.errno == 1049) {
        createDB();
    }
}

// 모델 인스턴스 생성
import TestModel from "./test/model";
const Test = TestModel(sequelize, DataTypes);

// 모델 동기화
sequelize
    .sync({ alter: true }) // 전체 테이블 상태를 확인하고 일치하도록 수정 (force로 드롭가능)
    .then(console.log("모델 동기화 성공✅."))
    .catch(console.log);

export { Test };
