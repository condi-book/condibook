import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import Modal from "../layout/Modal";
import SideBar from "../layout/SideBar";
import * as Api from "../api";
import { useParams } from "react-router-dom";
import { warningAlert, Alert } from "layout/Alert";

// 드래그할 때 스타일
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  color: "black",
  // border: isDragging && "1px solid rgba(76, 76, 76, 0.1)",
  background:
    "linear-gradient(135deg, rgba(18, 194, 233, 0.5) 0.61%, rgba(196, 113, 237, 0.5) 51.86%, rgba(246, 79, 89, 0.5) 100%)",
  borderRadius: 10,
  cursor: "pointer",
  ...draggableStyle,
});

const MypageBookmarkDetail = () => {
  const params = useParams();
  const [list, setList] = useState([]);
  const [link, setLink] = useState("");
  const [show, setShow] = useState(false);
  const [newLink, setNewLink] = useState("");
  // const [throttle, setThrottle] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    // listItems 복제
    const items = Array.from(list);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    // 순서 정렬할 때 사용 => API 연결 시
    console.log(
      items.map((v) => ({
        bookmark_id: v.bookmark_id,
        order_idx: items.indexOf(v) + 1,
      })),
    );
    Api.put(
      `folders/${params.folderId}/bookmarks/order`,
      items.map((v) => ({
        bookmark_id: v.bookmark_id,
        order_idx: items.indexOf(v) + 1,
      })),
    ).then(() => console.log("순서 정렬"));
    setList(items);
  };

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewLink(e.target.value);
  };

  // 링크 추가 함수
  const handlePushData = async (v: any) => {
    const copied = Array.from(list);
    await copied.push(v);
    await setList(copied);
    setNewLink("");
  };

  const handleDelete = (e: any, item: any) => {
    e.stopPropagation();
    Api.delete(`bookmarks/${item.bookmark_id}`).then(() => {
      const copied = Array.from(list);
      copied.splice(copied.indexOf(item), 1);
      setList(copied);
    });
  };

  useEffect(() => {
    Api.get(`folders/${params.folderId}/bookmarks`).then((res) => {
      // setList(res.data);
      console.log("폴더 상세 데이터", res.data);
      setList(res.data);
    });
  }, []);

  // 링크 삭제 로직
  const linkDelete = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    warningAlert(e, "해당 링크를 삭제하시겠습니까?", async () => {
      await handleDelete(e, item);
      await Alert.fire({
        icon: "success",
        title: "링크 삭제 성공",
      });
    });
  };

  return (
    <Div>
      <SideBar />

      <div className="detail-container">
        <div className="list box">
          <Title>{params.title}</Title>
          <div className="add dnd-item" onClick={handleClick}>
            <span className="pe-7s-plus"></span>
          </div>
          <Modal
            open={show}
            close={handleClick}
            handleChange={handleChange}
            newLink={newLink}
            handlePushData={handlePushData}
          />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="link-list">
              {(provided) => (
                <div
                  className="link-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.map((item, index) => {
                    const { website } = item;
                    return (
                      <div
                        key={`mybookmark-${item.bookmark_id}`}
                        className="dnd-item"
                        onClick={() => setLink(website.url)}
                      >
                        <Draggable
                          draggableId={`mybookmark-${item.bookmark_id}`}
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
                                  <span
                                    title="순서 이동"
                                    className="pe-7s-menu"
                                  />
                                </div>
                                <Img>
                                  <img src={website.img} alt="이미지" />
                                </Img>
                                <div className="content">
                                  <div>{`${website.meta_title.substr(
                                    0,
                                    30,
                                  )}...`}</div>
                                  <div className="sub">{`${website.url.substr(
                                    0,
                                    30,
                                  )}...`}</div>
                                </div>
                                <div>
                                  <span
                                    title="링크 삭제"
                                    className="pe-7s-trash icon"
                                    onClick={(e) => linkDelete(e, item)}
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
          {list.length === 0 ? (
            <Empty className="empty">
              <img src="/static/img/bookmark.svg" alt="preview"></img>
              <div>북마크를 추가하여</div>
              <div>미리보기(preview) 기능을 사용해보세요</div>
            </Empty>
          ) : (
            <iframe src={link} width="100%" height="100%"></iframe>
          )}
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.background};

  .detail-container {
    display: flex;
    width: 100%;
    border: 2px solid green;
    margin: 10px;
    margin-left: 0;
    background: white;
    border-radius: 10px;
  }

  .box {
    width: 50%;
    padding: 1%;
    margin: 10px;
    background: #f5f5f5;
    border-radius: 10px;
  }

  .add {
    text-align: center;
    margin: auto;
    font-size: 30px;
    border: 1px solid rgba(76, 76, 76, 0.1);
    // background: ${({ theme }) => theme.middleMainColor};
    background: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8%;

    .pe-7s-plus {
      font-weight: bold;
      // color: white;
      font-size: 1.5vw;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 10px rgba(76, 76, 76, 0.1);
    }
  }

  .content {
    width: 60%;
    padding: 5px;

    div {
      font-size: 1vw;
    }
    .sub {
      font-size: 0.8vw;
      background: #f5f5f5;
      border-radius: 10px;
      padding: 2px 5px;
    }
  }

  .dnd-item {
    margin: 3% 0;
    border-radius: 10px;

    .dnd-item-element {
      display: flex;
      justify-content: space-around;
      background: white;
      border-radius: 10px;
      width: 100%;

      span {
        font-size: 1.5vw;
        width: 20%;
      }

      .pe-7s-menu {
        font-weight: bold;
        cursor: all-scroll;
      }

      .pe-7s-trash {
        color: ${({ theme }) => theme.subRedColor};
        &:hover {
          font-weight: bold;
        }
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

const Img = styled.div`
  padding: 5px;
  width: 10%;
  height: 5%;

  img {
    width: 3vw;
    font-size: 0.5vw;
  }
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
  img {
    width: 15%;
    margin-bottom: 20px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.4vw;
`;

export default MypageBookmarkDetail;
