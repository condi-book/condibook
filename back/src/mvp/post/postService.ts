import { Post, User, Attached, Like } from "../../db";

class postService {
    static async createPost({ toCreate, user_id }) {
        const { title, content, views } = toCreate;
        const userInfo = await User.findOne({ user_id });
        const nickname = userInfo.nickname;
        const result = await Post.create({
            title,
            content,
            views,
            user_id,
            nickname,
        });
        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async getPost({ id }) {
        const postInfo = await Post.findOneById({ id });
        if (!postInfo) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        const attchedInfo = await Attached.findByPostId({ post_id: id });
        if (!attchedInfo) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        const likesInfo = await Like.findLikesByPost({ post_id: id });
        const websitesInfo = attchedInfo.map((v) => {
            return v.bookmark.website;
        });
        return { postInfo, websitesInfo, likesInfo };
    }
    static async getPostByQuery({ content }) {
        const postInfo = await Post.findAllByQuery({ content });
        return postInfo;
    }
    static async getPostList({ query, pageNumber }) {
        let offset = 0;
        if (pageNumber > 1) {
            offset = 20 * (pageNumber - 1);
        }
        if (query == "views") {
            const result = await Post.findAllByViews({ offset });
            if (!result) {
                const errorMessage = "해당 게시글이 없습니다.";
                return { errorMessage };
            }
            return result;
        }
        if (query == "likes") {
            const result = await Post.findAllByLikes({ offset });
            if (!result) {
                const errorMessage = "해당 게시글이 없습니다.";
                return { errorMessage };
            }
            return result;
        }
        const result = await Post.findAllList({ offset });

        if (!result) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        return result;
    }
    static async updatePost({ id, toUpdate, user_id, bookmark_id }) {
        const check = await Post.findOneById({ id });
        if (!check) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        if (check.author != user_id) {
            const errorMessage = "글 작성자가 아닙니다.";
            return { errorMessage };
        }
        await Post.updateOne({ id, toUpdate, bookmark_id });
        const result = await Post.findOneById({ id });
        return result;
    }
    static async deletePost({ id, user_id }) {
        const check = await Post.findOneById({ id });
        if (!check) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        if (check.author != user_id) {
            const errorMessage = "글 작성자가 아닙니다.";
            return { errorMessage };
        }
        const result = await Post.deleteOne({ id });

        return result;
    }
    static async updateViews({ id }) {
        const result = await Post.updateView({ id });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
    }
    static async setNickname({ user_id }) {
        const userInfo = await User.findOne({ user_id });

        const nickname = userInfo.nickname;

        const result = await Post.updateNickname({ user_id, nickname });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }

    static async deletePosts({ user_id }) {
        const userInfo = await User.findOne({ user_id });
        if (userInfo) {
            const errorMessage = "유저정보가 존재 합니다.";
            return { errorMessage };
        }

        const result = await Post.deletePosts({ user_id });

        if (!result) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return result;
    }
}
export { postService };
