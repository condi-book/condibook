import React from "react";

import styled from "styled-components";
import { Comment } from "./CommunityPostDetail";
import CalcDate from "./tools/CalcDate";

interface props {
  comments: Comment[];
}

const CommunityPostComments = ({ comments }: props) => {
  return (
    <>
      {comments.map((comment, idx) => (
        <Col key={`comment-${idx}`}>
          <Row>
            <Col>
              <div>{comment.author_name}</div>
              <div>{CalcDate(comment.createdAt)}</div>
            </Col>
            <div></div>
          </Row>
          <ContentContainer>
            <p>{comment.content}</p>
          </ContentContainer>
        </Col>
      ))}
    </>
  );
};

export default CommunityPostComments;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`;
