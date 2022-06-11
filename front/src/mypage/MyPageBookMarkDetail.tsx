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
    { id: "1", name: "link1" },
    { id: "2", name: "link2" },
    { id: "3", name: "link3" },
    { id: "4", name: "link4" },
  ],
};

// 드래그할 때 스타일
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  color: "black",
  border: isDragging ? "1px solid black" : "1px solid rgba(76, 76, 76, 0.1)",
  fontSize: 30,
  padding: "1%",
  ...draggableStyle,
});

const MypageBookmarkDetail = () => {
  const [list, setList] = useState(listContent.listItems);

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
                      <div key={item.id} className="dnd-item">
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                            >
                              {item.name}
                            </div>
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
        <div className="content box">링크내용</div>
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
    &:hover {
      border: solid 1px black;
    }
  }
`;
export default MypageBookmarkDetail;
