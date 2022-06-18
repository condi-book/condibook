import { useCallback, useEffect, useState } from "react";
// import * as Api from "../../../api";
import { PostPreview } from "../CommunityPage";

class PostPreviewModel {
  id: string;
  author: string;
  created_at: Date;
  title: string;
  content: string;
  views: number;

  constructor() {
    this.id = `${Math.floor(Math.random() * 10000)}`;
    this.author = "hayeong";
    this.created_at = new Date();
    this.title = "Lorem Ipsum";
    this.content =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lobortis, lorem at vehicula faucibus, ligula enim aliquam nibh, non imperdiet eros risus eu dui. Nulla sodales suscipit finibus. Maecenas ornare tempus auctor. Aenean blandit dui risus, pharetra lacinia nunc luctus et. Integer molestie scelerisque est, in vestibulum elit pellentesque at. Praesent suscipit vehicula auctor. In vitae justo eu ex vestibulum maximus. Ut accumsan lacus eget tellus iaculis dapibus.";
    this.views = Math.floor(Math.random() * 10);
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
