import { Sequelize, DataTypes, Op, Transaction } from "sequelize";
import { DB_DATABASE, DB_USER, DB_HOST, DB_PW, DB_DIALECT } from "../../config";

// sequelize 인스턴스 생성
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PW, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: console.log, // Logging (디폴트 설정임)
    query: { raw: true },
});
// 모델 정의
import UserSchema from "./userSchema";
const UserModel = UserSchema(sequelize, DataTypes);

import BookmarkSchema from "./bookmarkSchema";
const BookmarkModel = BookmarkSchema(sequelize, DataTypes);

import WebsiteSchema from "./websiteSchema";
const WebsiteModel = WebsiteSchema(sequelize, DataTypes);

import CategorySchema from "./categorySchema";
const CategoryModel = CategorySchema(sequelize, DataTypes);

import KeywordSchema from "./keywordSchema";
const KeywordModel = KeywordSchema(sequelize, DataTypes);

import AttachedSchema from "./attachedSchema";
const AttachedModel = AttachedSchema(sequelize, DataTypes);

import PostSchema from "./postSchema";
const PostModel = PostSchema(sequelize, DataTypes);

import CommentSchema from "./commentSchema";
const CommentModel = CommentSchema(sequelize, DataTypes);

import TeamSchema from "./teamSchema";
const TeamModel = TeamSchema(sequelize, DataTypes);

import MembershipSchema from "./membershipSchema";
const MembershipModel = MembershipSchema(sequelize, DataTypes);

import LikeSchema from "./likeSchema";
const LikeModel = LikeSchema(sequelize, DataTypes);

import FolderSchema from "./folderSchema";
const FolderModel = FolderSchema(sequelize, DataTypes);

import FDFavoriteSchema from "./folderfavoriteSchema";
const FDFavoriteModel = FDFavoriteSchema(sequelize, DataTypes);

import BMFavoriteSchema from "./bookmarkfavoriteSchema";
const BMFavoriteModel = BMFavoriteSchema(sequelize, DataTypes);

// 관계 정의

// Category : Website = 1 : N
const websites_fk_category = {
    name: "category_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "카테고리 ID",
};
CategoryModel.hasOne(WebsiteModel, { foreignKey: websites_fk_category });
WebsiteModel.belongsTo(CategoryModel, { foreignKey: websites_fk_category });

// Website : Keyword = 1 : N
const keywords_fk_website = {
    name: "website_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "사이트 ID",
};
WebsiteModel.hasMany(KeywordModel, { foreignKey: keywords_fk_website });
KeywordModel.belongsTo(WebsiteModel, { foreignKey: keywords_fk_website });

// Website : Bookmark = 1 : N
const bookmark_fk_website = {
    name: "website_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사이트 ID",
};
WebsiteModel.hasMany(BookmarkModel, { foreignKey: bookmark_fk_website });
BookmarkModel.belongsTo(WebsiteModel, { foreignKey: bookmark_fk_website });

// Bookmark : Attached = 1 : N
const attached_fk_bookmark = {
    name: "bookmark_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "북마크 ID",
};
BookmarkModel.hasMany(AttachedModel, { foreignKey: attached_fk_bookmark });
AttachedModel.belongsTo(BookmarkModel, { foreignKey: attached_fk_bookmark });

// Attached : Post = 1 : N
const attached_fk_post = {
    name: "post_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "게시물 ID",
};
PostModel.hasMany(AttachedModel, { foreignKey: attached_fk_post });
AttachedModel.belongsTo(PostModel, { foreignKey: attached_fk_post });

// User : Post = 1 : N
const post_fk_user = {
    name: "author",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
UserModel.hasMany(PostModel, { foreignKey: post_fk_user });
PostModel.belongsTo(UserModel, { foreignKey: post_fk_user });

// Post : Comment = 1 : N
const comment_fk_post = {
    name: "post_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "게시물 ID",
};
PostModel.hasMany(CommentModel, { foreignKey: comment_fk_post });
CommentModel.belongsTo(PostModel, { foreignKey: comment_fk_post });

// User : Comment = 1 : N
const comment_fk_user = {
    name: "author",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
UserModel.hasMany(CommentModel, { foreignKey: comment_fk_user });
CommentModel.belongsTo(UserModel, { foreignKey: comment_fk_user });

// User : Like = 1 : N
const like_fk_user = {
    name: "user_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
UserModel.hasMany(LikeModel, { foreignKey: like_fk_user });
LikeModel.belongsTo(UserModel, { foreignKey: like_fk_user });

// Post : Like = 1 : N
const like_fk_post = {
    name: "post_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "게시물 ID",
};
PostModel.hasMany(LikeModel, { foreignKey: like_fk_post });
LikeModel.belongsTo(PostModel, { foreignKey: like_fk_post });

// User : Membership = 1 : N
const membership_fk_user = {
    name: "member_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "사용자 ID",
};
UserModel.hasMany(MembershipModel, { foreignKey: membership_fk_user });
MembershipModel.belongsTo(UserModel, { foreignKey: membership_fk_user });

// Team : Membership = 1 : N
const membership_fk_team = {
    name: "team_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "팀 ID",
};
TeamModel.hasMany(MembershipModel, { foreignKey: membership_fk_team });
MembershipModel.belongsTo(TeamModel, { foreignKey: membership_fk_team });

// Folder : Bookmark = 1 : N
const bookmark_fk_folder = {
    name: "folder_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "폴더 ID",
};
FolderModel.hasMany(BookmarkModel, { foreignKey: bookmark_fk_folder });
BookmarkModel.belongsTo(FolderModel, { foreignKey: bookmark_fk_folder });

// User: Folder = 1 : N
const folder_fk_user = {
    name: "user_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "사용자 ID",
};
UserModel.hasMany(FolderModel, { foreignKey: folder_fk_user });
FolderModel.belongsTo(UserModel, { foreignKey: folder_fk_user });

// Team : Folder = 1 : N
const folder_fk_team = {
    name: "team_id",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "팀 ID",
};
TeamModel.hasMany(FolderModel, { foreignKey: folder_fk_team });
FolderModel.belongsTo(TeamModel, { foreignKey: folder_fk_team });

// User: Team = 1 : N
const team_fk_user = {
    name: "manager",
    type: DataTypes.INTEGER,
    onDelete: "setNull",
    comment: "매니저의 사용자 ID",
};
UserModel.hasMany(TeamModel, { foreignKey: team_fk_user });
TeamModel.belongsTo(UserModel, { foreignKey: team_fk_user });

// Folder: FDFavorite = 1 : N
const fdfavorite_fk_folder = {
    name: "folder_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "폴더 ID",
};
FolderModel.hasMany(FDFavoriteModel, { foreignKey: fdfavorite_fk_folder });
FDFavoriteModel.belongsTo(FolderModel, { foreignKey: fdfavorite_fk_folder });

// User: FDFavorite = 1 : N
const fdfavorite_fk_user = {
    name: "user_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "사용자 ID",
};
UserModel.hasMany(FDFavoriteModel, { foreignKey: fdfavorite_fk_user });
FDFavoriteModel.belongsTo(UserModel, { foreignKey: fdfavorite_fk_user });

// Bookmark: BMFavorite = 1 : N
const bmfavorite_fk_bookmark = {
    name: "bookmark_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "북마크 ID",
};
BookmarkModel.hasMany(BMFavoriteModel, { foreignKey: bmfavorite_fk_bookmark });
BMFavoriteModel.belongsTo(BookmarkModel, {
    foreignKey: bmfavorite_fk_bookmark,
});

// User: BMFavorite = 1 : N
const bmfavorite_fk_user = {
    name: "user_id",
    type: DataTypes.INTEGER,
    onDelete: "cascade",
    comment: "사용자 ID",
};
UserModel.hasMany(BMFavoriteModel, { foreignKey: bmfavorite_fk_user });
BMFavoriteModel.belongsTo(UserModel, { foreignKey: bmfavorite_fk_user });

// 모델 동기화
// sequelize
//     .sync({ alter: true }) // 전체 테이블 상태를 확인하고 일치하도록 수정 (force로 드롭가능)
//     .then(console.log("모델 동기화 성공✅."))
//     .catch(console.log);

export {
    sequelize,
    Op,
    UserModel,
    BookmarkModel,
    WebsiteModel,
    CategoryModel,
    KeywordModel,
    AttachedModel,
    PostModel,
    CommentModel,
    TeamModel,
    MembershipModel,
    LikeModel,
    FolderModel,
    FDFavoriteModel,
    BMFavoriteModel,
    Sequelize,
    Transaction,
};
