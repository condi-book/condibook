import { useCallback, useEffect, useState } from "react";
// import * as Api from "../../../api";
import { PostPreview } from "../CommunityPage";

class PostPreviewModel {
  id: string;
  user_id: string;
  created_at: Date;
  title: string;
  description: string;
  like: number;

  constructor() {
    this.id = `${Math.floor(Math.random() * 10000)}`;
    this.user_id = "hayeong";
    this.created_at = new Date();
    this.title = "제목";
    this.description = "요약";
    this.like = Math.floor(Math.random() * 10);
  }
}

const useFetch = (page: number, sortState: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [postsForScroll, setPostsForScroll] = useState<PostPreview[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    // const newestURL = ``;
    // const popularURL = ``;

    try {
      setIsLoading(true);

      // if (sortState === 'newest') {
      //   const { data } = await Api.get(newestURL);
      // } else {
      //   const { data } = await Api.get(popularURL);
      // }
      const data: PostPreview[] = Array(20)
        .fill(undefined)
        .map(() => new PostPreviewModel());

      console.log("sortState", sortState);

      if (!data) {
        throw new Error("서버에 오류가 있습니다!");
      }

      setPostsForScroll((current) => [...current, ...data]);
      setHasMore(data !== undefined);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { postsForScroll, hasMore, isLoading };
};

export default useFetch;
