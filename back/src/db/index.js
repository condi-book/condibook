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
import UserModel from "./user.schema";
const User = UserModel(sequelize, DataTypes);
import BookmarkModel from "./bookmark.schema";
const Bookmark = BookmarkModel(sequelize, DataTypes)
import WebsiteModel from "./website.schema"
const Website = WebsiteModel(sequelize, DataTypes)
import EmojiModel from "./emoji.schema"
const Emoji = EmojiModel(sequelize, DataTypes)
import KeywordModel from "./keyword.schema"
const Keyword = KeywordModel(sequelize, DataTypes)
import AttachedModel from "./attached.schema"
const Attached = AttachedModel(sequelize, DataTypes)


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
Website.hasMany(Emoji, {as : "Emojis"})
Emoji.belongsTo(Website)
Website.hasMany(Keyword, {as : "Keywords"})
Keyword.belongsTo(Website)
Website.hasMany(Bookmark, {as : "Bookmarks"})
Bookmark.belongsTo(Website)
Bookmark.hasMany(Attached)
Attached.belongsToMany(Bookmark, {through: Attached })
// Attached.belongsToMany(Board, {through: Attached })

User.hasMany(Board, {
    foreignKey: {
        name: "author",
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        comment: "사용자 ID",
    },
});
Board.belongsTo(User, {
    foreignKey: {
        name: "author",
        onDelete: "CASCADE",
    },
});

Board.hasMany(Comment, {
    foreignKey: {
        name: "board_id",
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        comment: "게시물 ID",
    },
});
Comment.belongsTo(Board, {
    foreignKey: {
        name: "board_id",
        onDelete: "CASCADE",
    },
});

User.hasMany(Comment, {
    foreignKey: {
        name: "author",
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        comment: "작성자",
    },
});
Comment.belongsTo(User, {
    foreignKey: {
        name: "author",
        onDelete: "CASCADE",
    },
});

User.hasMany(Like, {
    foreignKey: {
        name: "user_id",
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        comment: "사용자 ID",
    },
});
Like.belongsTo(User, {
    foreignKey: {
        name: "user_id",
        onDelete: "CASCADE",
    },
});

Board.hasMany(Like, {
    foreignKey: {
        name: "board_id",
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        comment: "게시물 ID",
    },
});
Like.belongsTo(Board, {
    foreignKey: {
        name: "board_id",
        onDelete: "CASCADE",
    },
});

User.belongsToMany(Group, {
    through: ActivityGroup,
});
Group.belongsToMany(User, {
    through: ActivityGroup,
});

// 모델 동기화
sequelize
    .sync({ alter: true }) // 전체 테이블 상태를 확인하고 일치하도록 수정 (force로 드롭가능)
    .then(console.log("모델 동기화 성공✅."))
    .catch(console.log);

export { sequelize, User, Bookmark, Website, Emoji, Keyword, Attached, Board, Comment, Group, ActivityGroup, Like};
