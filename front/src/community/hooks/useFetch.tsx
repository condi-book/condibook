import { PostPreview } from "community/CommunityPage";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import * as Api from "../../api";

const useFetch = (
  page: number,
  sortState: string,
  setPosts: {
    (value: SetStateAction<PostPreview[]>): void;
    (arg0: {
      (current: any): any[];
      (current: any): any[];
      (current: any): any[];
    }): void;
  },
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    try {
      setIsLoading(true);

      if (sortState === "new") {
        const res = await Api.get(`posts/list?order=new&pageNumber=${page}`);
        console.log(res);
        const { data } = res;
        if (data.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setPosts((current: any) => [...current, ...data]);
      } else if (sortState === "like") {
        const res = await Api.get(`posts/list?order=likes&pageNumber=${page}`);
        console.log(res);
        const { data } = res;
        if (data.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPosts((current: any) => [...current, ...data]);
      } else if (sortState === "view") {
        const res = await Api.get(`posts/list?order=views&pageNumber=${page}`);
        console.log(res);
        const { data } = res;
        if (data.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPosts((current: any) => [...current, ...data]);
      }
      console.log("sortState", sortState);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [page, sortState]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page, sortState]);

  return { hasMore, isLoading };
};

export default useFetch;
