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
    query: { raw: true },
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

import MembershipModel from "./schema/membership";
const Membership = MembershipModel(sequelize, DataTypes);

import LikeModel from "./schema/like";
const Like = LikeModel(sequelize, DataTypes);

// 관계 정의

// Website : Emoji = 1 : 1
const emojis_fk_website = {
    name: "website_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사이트 ID",
};
Website.hasOne(Emoji, {
    foreignKey: emojis_fk_website,
    onDelete: "cascade",
});
Emoji.belongsTo(Website, {
    foreignKey: emojis_fk_website,
    onDelete: "cascade",
});

// Website : Keyword = 1 : N
const keywords_fk_website = {
    name: "website_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사이트 ID",
};
Website.hasMany(Keyword, {
    foreignKey: keywords_fk_website,
    onDelete: "cascade",
});
Keyword.belongsTo(Website, {
    foreignKey: keywords_fk_website,
    onDelete: "cascade",
});

// User : Bookmark = 1 : N
const bookmark_fk_user = {
    name: "user_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Bookmark, { foreignKey: bookmark_fk_user });
Bookmark.belongsTo(User, { foreignKey: bookmark_fk_user });

// Website : Bookmark = 1 : N
const bookmark_fk_website = {
    name: "website_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사이트 ID",
};
Website.hasMany(Bookmark, { foreignKey: bookmark_fk_website });
Bookmark.belongsTo(Website, { foreignKey: bookmark_fk_website });

// Bookmark : Attached = 1 : N
const attached_fk_bookmark = {
    name: "bookmark_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사이트 ID",
};
Bookmark.hasMany(Attached, { foreignKey: attached_fk_bookmark });
Attached.belongsTo(Bookmark, { foreignKey: attached_fk_bookmark });

// Attached : Board = 1 : N
const attached_fk_board = {
    name: "board_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "게시물 ID",
};
Board.hasMany(Attached, { foreignKey: attached_fk_board });
Attached.belongsTo(Board, { foreignKey: attached_fk_board });

// User : Board = 1 : N
const board_fk_user = {
    name: "author",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Board, { foreignKey: board_fk_user });
Board.belongsTo(User, { foreignKey: board_fk_user });

// Board : Comment = 1 : N
const comment_fk_board = {
    name: "board_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "게시물 ID",
};
Board.hasMany(Comment, { foreignKey: comment_fk_board });
Comment.belongsTo(Board, { foreignKey: comment_fk_board });

// User : Comment = 1 : N
const comment_fk_user = {
    name: "author",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Comment, { foreignKey: comment_fk_user });
Comment.belongsTo(User, { foreignKey: comment_fk_user });

// User : Like = 1 : N
const like_fk_user = {
    name: "user_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Like, { foreignKey: like_fk_user });
Like.belongsTo(User, { foreignKey: like_fk_user });

// Board : Like = 1 : N
const like_fk_board = {
    name: "board_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "게시물 ID",
};
Board.hasMany(Like, { foreignKey: like_fk_board });
Like.belongsTo(Board, { foreignKey: like_fk_board });

// User : Membership = 1 : N
const membership_fk_user = {
    name: "member_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Membership, { foreignKey: membership_fk_user });
Membership.belongsTo(User, { foreignKey: membership_fk_user });

// Group : Membership = 1 : N
const membership_fk_group = {
    name: "group_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "그룹 ID",
};
Group.hasMany(Membership, { foreignKey: membership_fk_group });
Membership.belongsTo(Group, { foreignKey: membership_fk_group });

// 모델 동기화
// sequelize
//     .sync({ alter: true }) // 전체 테이블 상태를 확인하고 일치하도록 수정 (force로 드롭가능)
//     .then(console.log("모델 동기화 성공✅."))
//     .catch(console.log);

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
    Membership,
    Like,
};
