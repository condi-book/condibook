import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import SideBar from "../layout/SideBar";

const listContent = {
  title: "프론트엔드",
  listItems: [
    {
      id: "1",
      title: "티스토리",
      image: "",
      content: "내용을 입력해주세요",
      link: "https://tychejin.tistory.com/231",
    },
    {
      id: "2",
      title: "okayoon",
      image: "",
      content: "내용을 입력해주세요",
      link: "https://okayoon.tistory.com/entry/%EC%95%84%EC%9D%B4%ED%94%84%EB%A0%88%EC%9E%84iframe",
    },
    {
      id: "3",
      title: "nykim",
      image: "",
      content: "내용을 입력해주세요",
      link: "https://nykim.work/107",
    },
    {
      id: "4",
      title: "티스토리",
      image: "",
      content: "내용을 입력해주세요",
      link: "link4",
    },
  ],
};

// 드래그할 때 스타일
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  color: "black",
  border: isDragging && "2px solid rgba(76, 76, 76, 0.1)",
  fontSize: 20,
  background:
    "linear-gradient(90deg, #12C2E9 19.08%, #C471ED 49.78%, #F64F59 78.71%)",
  borderRadius: 10,
  cursor: "default",
  ...draggableStyle,
});

const MypageBookmarkDetail = () => {
  const [list, setList] = useState(listContent.listItems);
  const [link, setLink] = useState("");

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // listItems 복제
    const items = Array.from(list);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setList(items);
  };

  const handleClick = () => {
    alert("링크 추가하는 모달 나오기");
  };

  return (
    <Div>
      <SideBar />
      <div className="detail-container">
        <div className="list box">
          <div>{listContent.title}</div>
          <div className="add dnd-item" onClick={handleClick}>
            <span className="pe-7s-plus"></span>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="link-list">
              {(provided) => (
                <div
                  className="link-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.map((item, index) => {
                    return (
                      <div
                        key={item.id}
                        className="dnd-item"
                        onClick={() => setLink(item.link)}
                      >
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <DnDiv
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                            >
                              <div className="dnd-item-element">
                                <div>
                                  <span className="pe-7s-menu" />
                                </div>
                                <div>
                                  <img src={item.image} alt="이미지" />
                                </div>
                                <div>
                                  <div>{item.title}</div>
                                  <div>{item.content}</div>
                                </div>
                                <div>
                                  <span
                                    className="pe-7s-comment icon"
                                    onClick={() => alert("댓글달기")}
                                  />
                                  <span
                                    className="pe-7s-trash icon"
                                    onClick={() => alert("삭제하기")}
                                  />
                                </div>
                              </div>
                            </DnDiv>
                          )}
                        </Draggable>
                      </div>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className="content box">
          <iframe src={link} width="100%" height="100%"></iframe>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: #f8f9fc;

  .detail-container {
    display: flex;
    // justify-content: center;
    width: 90vw;
    border: 2px solid green;
    margin: 10px;
  }

  .box {
    width: 50%;
    padding: 1%;
  }

  .add {
    text-align: center;
    margin: auto;
    font-size: 30px;
    border: 1px solid rgba(76, 76, 76, 0.1);

    &:hover {
      cursor: pointer;
    }
  }

  .dnd-item {
    margin: 3% 0;

    .dnd-item-element {
      display: flex;
      justify-content: space-between;
      background: white;
      border-radius: 10px;

      span {
        font-size: 30px;
      }

      .pe-7s-menu {
        font-weight: bold;
        cursor: all-scroll;
      }

      .icon {
        cursor: pointer;
      }

      div {
        margin: auto;
      }
    }
  }
`;

const DnDiv = styled.div`
  &:hover {
    border: 2px solid rgba(76, 76, 76, 0.1);
  }
`;
export default MypageBookmarkDetail;
