import { useCallback, useEffect, useState } from "react";
import * as Api from "../../api";
import { PostPreview } from "../CommunityPage";

const useFetch = (page: number, sortState: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [postsForScroll, setPostsForScroll] = useState<PostPreview[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    try {
      setIsLoading(true);

      if (sortState === "new") {
        const res = await Api.get(
          `/community/posts/list?order=new&pageNumber=${page}`,
        );
        console.log(res);
        const { data } = res;
        setPostsForScroll((current) => [...current, ...data]);
      } else if (sortState === "like") {
        const res = await Api.get(
          `/community/posts/list?order=like&pageNumber=${page}`,
        );
        console.log(res);
        const { data } = res;
        setPostsForScroll((current) => [...current, ...data]);
      } else if (sortState === "view") {
        const res = await Api.get(
          `/community/posts/list?order=view&pageNumber=${page}`,
        );
        console.log(res);
        const { data } = res;
        setPostsForScroll((current) => [...current, ...data]);
      }
      console.log("sortState", sortState);

      if (!postsForScroll) {
        throw new Error("서버에 오류가 있습니다!");
      }

      setHasMore(postsForScroll.length !== 0);
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
