import React, { useCallback, useEffect, useState } from "react";
// import * as Api from "../../../api";
import { Bookmark } from "../CommunityPage";

const useFetch = (page: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarksForScroll, setBookmarksForScroll] = useState<
    Bookmark[] | any[]
  >([]);
  const [hasMore, setHasMore] = useState(false);

  const sendQuery = useCallback(async () => {
    // const url = ``;

    try {
      setIsLoading(true);

      // const { data } = await Api.get(url);
      const bookmark: Bookmark = {
        id: "12345",
        url: "http://google.com",
        created_at: new Date(),
        updated_at: new Date(),
        meta_title: "제목",
        meta_description: "요약",
      };
      const data = Array(20).fill(bookmark);

      if (!data) {
        throw new Error("서버에 오류가 있습니다!");
      }

      setBookmarksForScroll((current) => [...current, data]);
      setHasMore(data !== undefined);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [sendQuery, page]);

  return { bookmarksForScroll, hasMore, isLoading };
};

export default useFetch;
