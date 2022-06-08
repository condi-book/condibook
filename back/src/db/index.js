import { Sequelize, DataTypes } from "sequelize";
// sequelize 인스턴스 생성
const database = process.env.DB_DATABASE || "env 확인해주십시오.";
const username = process.env.DB_USER || "env 확인해주십시오.";
const password = process.env.DB_PW || "env 확인해주십시오.";
const host = process.env.DB_HOST || "env 확인해주십시오.";
const dialect = process.env.DB_DIALECT || "env 확인해주십시오.";

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    logging: console.log, // Logging (디폴트 설정임)
    define: {
        freezeTableName: true, // 모델과 테이블명 동일시 (전역적 설정)
    },
});

// 모델 정의
import UserModel from "./schema/user";
const User = UserModel(sequelize, DataTypes);

import BookmarkModel from "./schema/bookmark";
const Bookmark = BookmarkModel(sequelize, DataTypes);

import WebsiteModel from "./schema/website";
const Website = WebsiteModel(sequelize, DataTypes);

import EmojiModel from "./schema/emoji";
const Emoji = EmojiModel(sequelize, DataTypes);

import KeywordModel from "./schema/keyword";
const Keyword = KeywordModel(sequelize, DataTypes);

import AttachedModel from "./schema/attached";
const Attached = AttachedModel(sequelize, DataTypes);

import BoardModel from "./schema/board";
const Board = BoardModel(sequelize, DataTypes);

import CommentModel from "./schema/comment";
const Comment = CommentModel(sequelize, DataTypes);

import GroupModel from "./schema/group";
const Group = GroupModel(sequelize, DataTypes);

import ActivityGroupModel from "./schema/activityGroup";
const ActivityGroup = ActivityGroupModel(sequelize, DataTypes);

import LikeModel from "./schema/like";
const Like = LikeModel(sequelize, DataTypes);

// 관계 정의

// Website : Emoji = 1 : 1
Website.hasOne(Emoji, {
    foreignKey: {
        name: "website_id",
        onDelete: "CASCADE",
    },
});
Emoji.belongsTo(Website, {
    foreignKey: {
        name: "website_id",
        onDelete: "CASCADE",
    },
});

// Website : Keyword = 1 : N
Website.hasMany(Keyword, {
    foreignKey: {
        name: "website_id",
        onDelete: "CASCADE",
    },
});
Keyword.belongsTo(Website, {
    foreignKey: {
        name: "website_id",
        onDelete: "CASCADE",
    },
});

// User : Bookmark = 1 : N
User.hasMany(Bookmark, {
    foreignKey: {
        name: "user_id",
        type: DataTypes.UUID,
        allowNull: false,
        comment: "사용자 ID",
        onDelete: "CASCADE",
    },
});
Bookmark.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        type: DataTypes.UUID,
        allowNull: false,
        comment: "사용자 ID",
        onDelete: "CASCADE",
    },
});

// Website : Bookmark = 1 : N
Website.hasMany(Bookmark, {
    foreignKey: {
        name: "website_id",
        type: DataTypes.UUID,
        allowNull: false,
        comment: "사이트 ID",
        onDelete: "CASCADE",
    },
});
Bookmark.belongsTo(Website, {
    foreignKey: {
        name: "website_id",
        type: DataTypes.UUID,
        allowNull: false,
        comment: "사이트 ID",
        onDelete: "CASCADE",
    },
});

// Bookmark : Board = N : M
Bookmark.belongsToMany(Board, {
    through: Attached,
    foreignKey: "bookmark_id",
});
Board.belongsToMany(Bookmark, {
    through: Attached,
    foreignKey: "board_id",
});

// User : Board = 1 : N
User.hasMany(Board, {
    foreignKey: {
        name: "author",
        onDelete: "CASCADE",
    },
});
Board.belongsTo(User, {
    foreignKey: {
        name: "author",
        onDelete: "CASCADE",
    },
});

// Board : Comment = 1 : N
Board.hasMany(Comment, {
    foreignKey: {
        name: "board_id",
        onDelete: "CASCADE",
    },
});
Comment.belongsTo(Board, {
    foreignKey: {
        name: "board_id",
        onDelete: "CASCADE",
    },
});

// User : Comment = 1 : N
User.hasMany(Comment, {
    foreignKey: {
        name: "author",
        onDelete: "CASCADE",
    },
});
Comment.belongsTo(User, {
    foreignKey: {
        name: "author",
        onDelete: "CASCADE",
    },
});

// User : Like = 1 : N
User.hasMany(Like, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE",
    },
});
Like.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE",
    },
});

// Board : Like = 1 : N
Board.hasMany(Like, {
    foreignKey: {
        name: "board_id",
        onDelete: "CASCADE",
    },
});
Like.belongsTo(Board, {
    foreignKey: {
        name: "board_id",
        onDelete: "CASCADE",
    },
});

// User : Group = N : M
User.belongsToMany(Group, {
    through: ActivityGroup,
    foreignKey: "member_id",
});
Group.belongsToMany(User, {
    through: ActivityGroup,
    foreignKey: "group_id",
});

// 모델 동기화
sequelize
    .sync({ alter: true }) // 전체 테이블 상태를 확인하고 일치하도록 수정 (force로 드롭가능)
    .then(console.log("모델 동기화 성공✅."))
    .then(async () => {
        // await User.bulkCreate([
        //     { email: "test@test.com" },
        //     { email: "test2@test.com" },
        // ]);
        const all = await User.findAll({ raw: true });
        console.log(all);
        // const board = await Board.bulkCreate([
        //     { author: all[0].id, title: "frontend" },
        //     { author: all[1].id, title: "backend" },
        // ]);

        // console.log(all, board);
        return all;
    })
    .then(async (data) => {
        const newBoard = await Board.findOne({
            where: {
                author: data[0].id,
            },
        });
        console.log(newBoard);
        return { b: newBoard.id, u: data[1].id };
    })
    .then(async ({ b, u }) => {
        const newLike = await Like.create({
            user_id: u,
            board_id: b,
        });
        console.log(newLike);
    })
    // .then(() => {
    //     Board.destroy({
    //         where: { id: "d51365a4-ba6a-45b7-bbfe-c8679a72f5dc" },
    //     });
    // })
    // .then(() => {
    //     User.destroy({ where: { email: "test2@test.com" } });
    // })
    .catch(console.log);

export {
    sequelize,
    User,
    Bookmark,
    Website,
    Emoji,
    Keyword,
    Attached,
    Board,
    Comment,
    Group,
    ActivityGroup,
    Like,
};
