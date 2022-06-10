import React, { useCallback, useEffect, useState } from "react";
// import * as Api from "../../../api";
import { Bookmark } from "../CommunityPage";

class BookmarkModel {
  id: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  meta_title: string;
  meta_description: string;

  constructor() {
    this.id = `${Math.floor(Math.random() * 10000)}`;
    this.url = "http://google.com";
    this.created_at = new Date();
    this.updated_at = new Date();
    this.meta_title = "제목";
    this.meta_description = "요약";
  }
}

const useFetch = (page: number) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookmarksForScroll, setBookmarksForScroll] = useState<Bookmark[] | []>(
    [],
  );
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

      const data: Bookmark[] = Array(20)
        .fill(undefined)
        .map(() => new BookmarkModel());

      if (!data) {
        throw new Error("서버에 오류가 있습니다!");
      }

      setBookmarksForScroll((current) => [...current, ...data]);
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
