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

import PostModel from "./schema/post";
const Post = PostModel(sequelize, DataTypes);

import CommentModel from "./schema/comment";
const Comment = CommentModel(sequelize, DataTypes);

import TeamModel from "./schema/team";
const Team = TeamModel(sequelize, DataTypes);

import MembershipModel from "./schema/membership";
const Membership = MembershipModel(sequelize, DataTypes);

import LikeModel from "./schema/like";
const Like = LikeModel(sequelize, DataTypes);

import FolderModel from "./schema/folder";
const Folder = FolderModel(sequelize, DataTypes);

// 관계 정의

// Website : Emoji = 1 : 1
const emojis_fk_website = {
    name: "website_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "사이트 ID",
};
Website.hasOne(Emoji, { foreignKey: emojis_fk_website });
Emoji.belongsTo(Website, { foreignKey: emojis_fk_website });

// Website : Keyword = 1 : N
const keywords_fk_website = {
    name: "website_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "사이트 ID",
};
Website.hasMany(Keyword, { foreignKey: keywords_fk_website });
Keyword.belongsTo(Website, { foreignKey: keywords_fk_website });

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
    comment: "북마크 ID",
};
Bookmark.hasMany(Attached, { foreignKey: attached_fk_bookmark });
Attached.belongsTo(Bookmark, { foreignKey: attached_fk_bookmark });

// Attached : Post = 1 : N
const attached_fk_post = {
    name: "post_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "게시물 ID",
};
Post.hasMany(Attached, { foreignKey: attached_fk_post });
Attached.belongsTo(Post, { foreignKey: attached_fk_post });

// User : Post = 1 : N
const post_fk_user = {
    name: "author",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Post, { foreignKey: post_fk_user });
Post.belongsTo(User, { foreignKey: post_fk_user });

// Post : Comment = 1 : N
const comment_fk_post = {
    name: "post_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "게시물 ID",
};
Post.hasMany(Comment, { foreignKey: comment_fk_post });
Comment.belongsTo(Post, { foreignKey: comment_fk_post });

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

// Post : Like = 1 : N
const like_fk_post = {
    name: "post_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "게시물 ID",
};
Post.hasMany(Like, { foreignKey: like_fk_post });
Like.belongsTo(Post, { foreignKey: like_fk_post });

// User : Membership = 1 : N
const membership_fk_user = {
    name: "member_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Membership, { foreignKey: membership_fk_user });
Membership.belongsTo(User, { foreignKey: membership_fk_user });

// Team : Membership = 1 : N
const membership_fk_team = {
    name: "team_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "팀 ID",
};
Team.hasMany(Membership, { foreignKey: membership_fk_team });
Membership.belongsTo(Team, { foreignKey: membership_fk_team });

// Folder : Bookmark = 1 : N
const bookmark_fk_folder = {
    name: "folder_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "폴더 ID",
};
Folder.hasMany(Bookmark, { foreignKey: bookmark_fk_folder });
Bookmark.belongsTo(Folder, { foreignKey: bookmark_fk_folder });

// User: Folder = 1 : N
const folder_fk_user = {
    name: "user_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
User.hasMany(Folder, { foreignKey: folder_fk_user });
Folder.belongsTo(User, { foreignKey: folder_fk_user });

// Team : Folder = 1 : N
const folder_fk_team = {
    name: "team_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "팀 ID",
};
Team.hasMany(Folder, { foreignKey: folder_fk_team });
Folder.belongsTo(Team, { foreignKey: folder_fk_team });

// User: Team = 1 : N
const team_fk_user = {
    name: "manager",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "매니저의 사용자 ID",
};
User.hasMany(Team, { foreignKey: team_fk_user });
Team.belongsTo(User, { foreignKey: team_fk_user });

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
    Post,
    Comment,
    Team,
    Membership,
    Like,
    Folder,
};
