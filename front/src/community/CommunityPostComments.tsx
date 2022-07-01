import React from "react";

import styled from "styled-components";
import { Comment } from "./CommunityPostDetail";
import CalcDate from "./tools/CalcDate";
import * as Api from "../api";

interface props {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

const CommunityPostComments = ({ comments, setComments }: props) => {
  const [commentContent, setCommentContent] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const isAuthor = (author: string) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return author === user?.id;
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentEdit =
    (id: string) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        const res = await Api.put(`comments/${id}`, {
          content: commentContent,
        });

        setComments(
          comments.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                content: res.data.content,
              };
            }
            return comment;
          }),
        );
        setIsEditing(false);
      } catch (e) {
        alert(e);
      }
    };

  const handleCommentDelete =
    (id: string) => async (e: React.MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        if (window.confirm("삭제하시겠습니까?")) {
          await Api.delete(`comments/${id}`);
          setComments(
            comments.filter((comment) => {
              return comment.id !== id;
            }),
          );
        } else {
          return;
        }
      } catch (e) {
        alert(e);
      }
    };
  return (
    <>
      {comments.map((comment, idx) => (
        <Col key={`comment-${idx}`}>
          <Row>
            <InfoContainer>
              <span className="username">{comment.author_name}</span>
              <span className="separator">|</span>
              <span className="date">
                {CalcDate(new Date(comment?.createdAt))}
              </span>
            </InfoContainer>
            {!isAuthor(comment.author) ? (
              <></>
            ) : (
              <ButtonContainer>
                <button
                  className="hoverButton"
                  onClick={() => {
                    setIsEditing(true);
                    setCommentContent(comment.content);
                  }}
                >
                  <span>수정</span>
                </button>
                <button
                  className="hoverButton"
                  onClick={handleCommentDelete(comment.id)}
                >
                  <span>삭제</span>
                </button>
              </ButtonContainer>
            )}
          </Row>
          <ContentContainer>
            {isEditing ? (
              <Row>
                <EditInput
                  value={commentContent}
                  onChange={handleCommentChange}
                />
                <ButtonContainer>
                  <button
                    className="hoverButton"
                    onClick={handleCommentEdit(comment.id)}
                  >
                    <span>완료</span>
                  </button>
                </ButtonContainer>
              </Row>
            ) : (
              <p style={{ marginBottom: "0" }}>{comment.content}</p>
            )}
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
  justify-content: center;
  margin-top: 10px;
  background-color: white;
  padding: 10px 5px;
  border-radius: 5px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  font-size: 1.1vw;
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const InfoContainer = styled.div`
  align-items: center;
  font-size: 1.1vw;
  display: flex;
  justify-content: space-between;

  .username {
    font-weight: bold;
    font-size: 1.2vw;
  }

  .date {
    font-size: 1vw;
    color: #8f9bb3;
  }

  .separator {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: flex-end;
  margin-bottom: 0.75rem;
  z-index: 5;
  align-items: center;
  margin-top: 0.5rem;

  span {
    font-size: 1rem;
  }
  .hoverButton {
    height: 100%;
    weight: 100%;
    padding: 0.5rem 1rem;
    align-items: center;
    background: none;
    border-radius: 4px;
    border: none;
    display: flex;
    outline: none;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

const EditInput = styled.textarea`
  background: transparent;
  display: block;
  padding: 0px;
  font-size: 1.125rem;
  width: 90%;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
  resize: none;
  line-height: 1.7;
  outline: none;
  border: 3px solid black;
  border-radius: 4px;
  font-weight: bold;
`;
