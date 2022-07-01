import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import Modal from "../layout/Modal";
import * as Api from "../api";
import { useParams } from "react-router-dom";
import { useOutletContextProps } from "./TeamPage";

// 드래그할 때 스타일
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  color: "black",
  border: isDragging && "2px solid rgba(76, 76, 76, 0.1)",
  fontSize: 20,
  background:
    "linear-gradient(90deg, #12C2E9 19.08%, #C471ED 49.78%, #F64F59 78.71%)",
  borderRadius: 10,
  cursor: "pointer",
  ...draggableStyle,
});

const TeamPageDetail = () => {
  const params = useParams();
  const { selectedFolder, teams, setTeam, fetchTeamFolderData } =
    useOutletContextProps();
  const [list, setList] = React.useState([]);
  const [link, setLink] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [newLink, setNewLink] = React.useState("");

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
    // if (!throttle) {
    //   console.log(`throttling`);
    //   setThrottle(true);
    //   handleThrottle(items);
    // }
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
      alert("삭제 성공");
    });
  };

  const fetchUpdateTeam = async () => {
    const team = teams.find((v) => v.team_id === parseInt(params.teamid));
    await setTeam(team);

    await fetchTeamFolderData(parseInt(params.teamid));
  };

  const fetchBookmarks = async () => {
    const res = await Api.get(`folders/${params.folderId}/bookmarks`);
    setList(res.data.bookmarks);
  };

  React.useEffect(() => {
    fetchBookmarks();
  }, []);

  React.useEffect(() => {
    fetchUpdateTeam();
  }, []);

  React.useEffect(() => {
    fetchBookmarks();
  }, [selectedFolder]);
  return (
    <Div>
      <div className="detail-container">
        <div className="list box">
          <div>{params.title}</div>
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
                  {list?.map((item, index) => {
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
                                  <span className="pe-7s-menu" />
                                </div>
                                <Img>
                                  <img src={website.img} alt="이미지" />
                                </Img>
                                <div>
                                  <div>{website.meta_title}</div>
                                  <div>{`${website.url.substr(0, 20)}...`}</div>
                                </div>
                                <div>
                                  <span
                                    className="pe-7s-trash icon"
                                    onClick={(e) => handleDelete(e, item)}
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
    width: 100%;
    border: 2px solid green;
    margin: 10px;
    height: 100vh;
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

const Img = styled.div`
  width: 20%;
  height: 10%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default TeamPageDetail;