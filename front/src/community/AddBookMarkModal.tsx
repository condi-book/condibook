import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { Bookmark } from "./CommunityPostWrite";
// import * as Api from "../api";

type StyleProps = {
  show: boolean;
};

interface Folder {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  bookmark_count: number;
  favorites: boolean;
  first_bookmark_url: null;
}

interface props {
  isModalShow: boolean;
  setIsModalShow: (isModalShow: boolean) => void;
  postBookmarks: Bookmark[];
  setPostBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
}
const dummyData: Folder[] = [
  {
    id: "46",
    title: "프론트엔드",
    createdAt: "2022-06-18T15:33:57.000Z",
    updatedAt: "2022-06-18T15:33:57.000Z",
    bookmark_count: 0,
    favorites: false,
    first_bookmark_url: null,
  },
  {
    id: "47",
    title: "백엔드",
    createdAt: "2022-06-18T17:17:57.000Z",
    updatedAt: "2022-06-18T17:17:57.000Z",
    bookmark_count: 0,
    favorites: false,
    first_bookmark_url: null,
  },
  {
    id: "48",
    title: "AI",
    createdAt: "2022-06-18T17:18:04.000Z",
    updatedAt: "2022-06-18T17:18:04.000Z",
    bookmark_count: 0,
    favorites: false,
    first_bookmark_url: null,
  },
];

const dummyBookmark = [
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
    link: "https://hsp0418.tistory.com/123",
  },
];

const AddBookMarkModal = ({
  isModalShow,
  setIsModalShow,
  postBookmarks,
  setPostBookmarks,
}: props) => {
  const [newLink, setNewLink] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [tab, setTab] = React.useState("폴더를 선택하세요");
  const [folders, setFolders] = React.useState<Folder[]>([]);
  const [selectedFolderBookmarks, setSelectedFolderBookmarks] = React.useState<
    Bookmark[]
  >([]);

  // 드랍메뉴에 보여줄 폴더리스트
  const folderList = (
    handleTab: (e: React.MouseEvent<HTMLDivElement>) => void,
  ) => {
    return folders.map((folder, idx) => (
      <div key={`folder-selectTab-${idx}`} onClick={handleTab}>
        {folder.title}
      </div>
    ));
  };

  // url 입력시 이벤트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink(e.target.value);
  };

  // 폴더 선택
  const handleTab = async (e: React.MouseEvent<HTMLDivElement>) => {
    setTab((e.target as HTMLElement).textContent);
    setShow((prev) => !prev);
    // const selectedFolderID = folders.find(
    //   (folder) => folder.title === (e.target as HTMLElement).textContent,
    // ).id;
    // const { data } = await Api.get(`folder/${selectedFolderID}`);
    const data = dummyBookmark;
    const checkAddData = data.map((bookmark) => {
      const checkedBookmark = postBookmarks.find(
        (postBookmark) => postBookmark.id === bookmark.id,
      );
      return {
        ...bookmark,
        checked: checkedBookmark.checked,
      };
    });
    setSelectedFolderBookmarks(checkAddData);
  };

  // 포스트 추가할 북마크 선택
  const handleCheckElement = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const checkedbookmarkID = e.target.value;

    if (checked) {
      setPostBookmarks((prev) => [
        ...prev,
        selectedFolderBookmarks.find(
          (bookmark) => bookmark.id === checkedbookmarkID,
        ),
      ]);
    } else {
      setPostBookmarks(
        selectedFolderBookmarks.filter(
          (bookmark) => bookmark.id !== checkedbookmarkID,
        ),
      );
    }
  };

  // 북마크 입력
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setPostBookmarks((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          title: "",
          image: "",
          content: "",
          link: newLink,
          checked: true,
        },
      ]);
      setNewLink("");
    }
  };

  // 북마크 입력
  const handleClickAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setPostBookmarks((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        title: "",
        image: "",
        content: "",
        link: newLink,
        checked: true,
      },
    ]);
    setNewLink("");
  };

  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalShow(false);
  };

  React.useEffect(() => {
    // 유저 폴더들 불러오기
    setFolders(dummyData);
  }, []);
  return (
    <>
      <Modal
        size="lg"
        show={isModalShow}
        onHide={() => setIsModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <DropDown show={show}>
              <div className="container">
                <div
                  className="dropdown-header"
                  onClick={() => setShow((prev) => !prev)}
                >
                  <p>{tab}</p>
                  <span className="pe-7s-angle-down" />
                </div>
                <div className="select">{folderList(handleTab)}</div>
              </div>
            </DropDown>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col>
            <Row>
              <Col>
                {selectedFolderBookmarks.map((bookmark, idx) => (
                  <Row key={`postBookmark-${idx}`}>
                    <input
                      type="checkbox"
                      value={bookmark.id}
                      onChange={handleCheckElement}
                      checked={bookmark.checked}
                    />
                    <span>{bookmark.title}</span>
                    <span>{bookmark.link}</span>
                  </Row>
                ))}
              </Col>
            </Row>
            <Row>
              <Input
                value={newLink}
                onChange={handleChange}
                placeholder="링크를 입력해주세요"
                onKeyPress={handleKeyPress}
              ></Input>
              <button onClick={handleClickAdd}>
                <span>등록</span>
              </button>
            </Row>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsModalShow(false)}>취소</button>
          <button onClick={handleComplete}>완료</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBookMarkModal;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;

  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;
  &:focus {
    outline: none;
  }
`;

const DropDown = styled.div<StyleProps>`
  position: relative;
  width: auto;
  height: 50px;
  -webkit-box-pack: justify;
  display: flex;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100%;
    position: relative;
    -webkit-box-pack: center;
  }
  .select {
    top: 0px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    -webkit-box-pack: center;
    justify-content: center;
    width: 200px;
    padding: 50px 20px 0px;
    border-radius: 8px;
    background-color: rgb(235, 235, 235);
    z-index: 3;
    height: ${({ show }) => (show ? "168px" : "50px")};
    visibility: ${({ show }) => (show ? "visible" : "hidden")};
    transition: height 0.3s ease-out;

    div {
      display: flex;
      -webkit-box-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      align-items: center;
      width: 100%;
      height: 35px;
      color: rgb(96, 96, 96);
      font-size: 16px;
      letter-spacing: -0.05em;
      cursor: pointer;
      font-weight: 700;
    }
  }
  .dropdown-header {
    position: absolute;
    top: 0px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    width: 200px;
    height: 50px;
    padding: 0px 20px;
    border-radius: 8px;
    color: rgb(96, 96, 96);
    background-color: rgb(235, 235, 235);
    font-size: 16px;
    font-weight: 400;
    letter-spacing: -0.05em;
    z-index: 4;
    cursor: pointer;

    p {
      margin: auto 0;
    }
    span {
      font-size: 20px;
      font-weight: bolder;
    }
  }
`;
