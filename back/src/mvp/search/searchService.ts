import { Folder, Post, Team } from "../../db";

class searchSerivce {
    static async getPostByQuery({ query, pageNumber, content, type }) {
        if (!content) {
            const errorMessage = "검색할 내용이 없습니다";
            return { errorMessage };
        }
        if (content.length == 1) {
            const errorMessage = "두 글자 이상 입력 해주세요.";
            return { errorMessage };
        }
        let offset = 0;
        if (pageNumber > 1) {
            offset = 20 * (pageNumber - 1);
        }
        if (query == "views") {
            const result = await Post.searchAllByViews({
                offset,
                content,
                type,
            });
            if (!result) {
                const errorMessage = "해당 게시글이 없습니다.";
                return { errorMessage };
            }
            return result;
        }
        if (query == "likes") {
            const result = await Post.searchAllByLikes({
                offset,
                content,
                type,
            });
            if (!result) {
                const errorMessage = "해당 게시글이 없습니다.";
                return { errorMessage };
            }
            return result;
        }
        const result = await Post.searchAllByQuery({ offset, content, type });

        if (!result) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        return result;
    }

    static async getFolderByQuery({ user_id, pageNumber, content, team_ids }) {
        if (!content) {
            const errorMessage = "검색할 내용이 없습니다";
            return { errorMessage };
        }
        let offset = 0;
        if (pageNumber > 1) {
            offset = 20 * (pageNumber - 1);
        }
        const myFolder = await Folder.searchFolderByTitle({
            user_id,
            offset,
            content,
        });
        if (!myFolder) {
            const errorMessage = "해당 게시글이 없습니다.";
            return { errorMessage };
        }
        const teamFolders = await Team.searchTeamByQuery({
            content,
            team_ids,
        });

        return { myFolder, teamFolders };
    }
}

export { searchSerivce };
