import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
      <Row xs={2} md={4} lg={6} xl={8} xxl={10}>
        {bookmarksForScroll?.map((bookmark: Bookmark) => (
          <Col>
            <BookmarkCard />
          </Col>
        ))}
        <div ref={observer} />
        <>{isLoading && <p>Loading...</p>}</>
      </Row>
    </Container>
  );
};

export default BookmarkList;
