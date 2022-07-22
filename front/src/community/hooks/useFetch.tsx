import { PostPreview } from "community/CommunityPage";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import * as Api from "../../api";

const useFetch = (
  page: number,
  sortState: number,
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

      if (sortState === 1) {
        const res = await Api.get(`posts/list?order=new&pageNumber=${page}`);
        const { data } = res;
        if (data.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setPosts((current: any) => [...current, ...data]);
      } else if (sortState === 2) {
        const res = await Api.get(`posts/list?order=likes&pageNumber=${page}`);
        const { data } = res;
        if (data.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPosts((current: any) => [...current, ...data]);
      } else if (sortState === 3) {
        const res = await Api.get(`posts/list?order=views&pageNumber=${page}`);
        const { data } = res;
        if (data.length < 20) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        setPosts((current: any) => [...current, ...data]);
      }

      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  }, [page, sortState]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page, sortState]);

  return { hasMore, isLoading };
};

export default useFetch;
