import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import BookmarkCard from "./BookmarkCard";
import useFetch from "./hooks/useFetch";
import { Bookmark } from "./CommunityPage";

const BookmarkList = () => {
  const [pageNum, setPageNum] = useState(1);
  const { bookmarksForScroll, hasMore, isLoading } = useFetch(pageNum);
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
        {bookmarksForScroll.map((bookmark: Bookmark) => (
          <Col key={`bookmark-${bookmark.id}`}>
            <BookmarkCard bookmark={bookmark} />
          </Col>
        ))}
        <div ref={observer} />
        <>{isLoading && <p>Loading...</p>}</>
      </Row>
      {/* </Row> */}
    </Container>
  );
};

export default BookmarkList;

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
