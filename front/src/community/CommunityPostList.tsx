import React, { useState, useRef } from "react";
import styled from "styled-components";
import CommunityPostCard from "./CommunityPostCard";
import useFetch from "./hooks/useFetch";
import { PostPreview } from "./CommunityPage";

interface CommunityPostListProps {
  sortState: string;
}
// class PostPreviewModel implements PostPreview {
//   id: string;
//   author: string;
//   author_name: string;
//   createdAt: Date;
//   title: string;
//   like_counts: number;
//   updatedAt: Date;
//   views: number;

//   constructor() {
//     this.id = `${Math.floor(Math.random() * 10000)}`;
//     this.author = "";
//     this.createdAt = new Date();
//     this.title = "";
//     this.views = Math.floor(Math.random() * 10);
//   }
// }

// const loadingData: PostPreview[] = Array(20)
//   .fill(undefined)
//   .map(() => new PostPreviewModel());

const CommunityPostList = ({ sortState }: CommunityPostListProps) => {
  const [pageNum, setPageNum] = useState(1);
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const { hasMore, isLoading } = useFetch(pageNum, sortState, setPosts);
  const observerRef: React.MutableRefObject<null | IntersectionObserver> =
    useRef(null);

  const observer = (node: HTMLDivElement) => {
    if (isLoading) {
      return;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        setPageNum((page) => page + 1);
      }
    });

    node && observerRef.current.observe(node);
  };

  const handleChangeSort = () => {
    setPageNum(1);
    setPosts([]);
  };

  React.useEffect(() => {
    handleChangeSort();
  }, [sortState]);

  return (
    <Div>
      <Row>
        {posts.map((PostPreview: PostPreview) => (
          <Col key={`preview-${sortState}-${PostPreview.id}`}>
            <CommunityPostCard PostPreview={PostPreview} />
          </Col>
        ))}
        <div ref={observer} />
        <>
          {isLoading && (
            // loadingData.map((PostPreview: PostPreview) => (
            //   <Col key={`preview-${sortState}-${PostPreview.id}`}>
            //     <CommunityPostCard PostPreview={PostPreview} />
            //   </Col>
            // ))}
            <div>loading</div>
          )}
        </>
      </Row>
    </Div>
  );
};

export default CommunityPostList;

const Div = styled.div`
  display: flex;
  // margin-top: 2rem;
  width: 100%;
`;
const Col = styled.div`
  width: 15rem;
  border: ${({ theme }) => theme.border};
  box-shadow: rgb(0 0 0 / 10%) 2px 2px 4px;
  border-radius: 5px;
  background: white;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  transition: box-shadow 0.1s linear;

  &:hover {
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Row = styled.div`
  display: flex;
  // margin: -1rem;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
