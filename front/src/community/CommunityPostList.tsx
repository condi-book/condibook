import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import CommunityCard from "./CommunityCard";
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

  return (
    <Container fluid>
      {/* <Row xs={2} md={4} lg={6} xl={8} xxl={10}> */}
      <Row>
        {postsForScroll.map((PostPreview: PostPreview) => (
          <Col key={`preview-${PostPreview.id}`}>
            <CommunityCard PostPreview={PostPreview} />
          </Col>
        ))}
        <div ref={observer} />
        <>{isLoading && <p>Loading...</p>}</>
      </Row>
      {/* </Row> */}
    </Container>
  );
};

export default CommunityPostList;

const Col = styled.div`
  width: 15rem;
  border: 2px solid;
  border-radius: 3px;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
`;
