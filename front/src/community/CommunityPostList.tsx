import React, { useState, useRef } from "react";
import styled from "styled-components";
import CommunityPostCard from "./CommunityPostCard";
import useFetch from "./hooks/useFetch";
import { PostPreview } from "./CommunityPage";

interface CommunityPostListProps {
  sortState: string;
}

const CommunityPostList = ({ sortState }: CommunityPostListProps) => {
  const [pageNum, setPageNum] = useState(1);
  const { postsForScroll, hasMore, isLoading } = useFetch(pageNum, sortState);
  const observerRef: React.MutableRefObject<null | IntersectionObserver> =
    useRef(null);

  // observer 초기화할때 전달하는 인자
  const options = {
    rootMargin: "20px", // 관찰하는 viewport margin 지정
    threshold: 1.0, // 관찰 요소와 얼마큼 겹쳤을 때 콜백 수행하도록 지정
  };

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
    }, options);

    node && observerRef.current.observe(node);
  };

  React.useEffect(() => {
    setPageNum(1);
  }, [sortState]);

  return (
    <Div>
      <Row>
        {postsForScroll.map((PostPreview: PostPreview) => (
          <Col key={`preview-${PostPreview.id}`}>
            <CommunityPostCard PostPreview={PostPreview} />
          </Col>
        ))}
        <div ref={observer} />
        <>{isLoading && <p>Loading...</p>}</>
      </Row>
    </Div>
  );
};

export default CommunityPostList;

const Div = styled.div`
  display: flex;
  margin-top: 2rem;
  align-items: center;
`;
const Col = styled.div`
  width: 15rem;
  border: 2px solid;
  border-radius: 3px;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
