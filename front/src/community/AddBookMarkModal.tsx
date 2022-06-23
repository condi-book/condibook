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
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
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

const AddBookMarkModal = ({
  isModalShow,
  setIsModalShow,
  bookmarks,
  setBookmarks,
}: props) => {
  const [newLink, setNewLink] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [tab, setTab] = React.useState("폴더를 선택하세요");
  const [folders, setFolders] = React.useState<Folder[]>([]);

  const folderList = (
    handleTab: (e: React.MouseEvent<HTMLDivElement>) => void,
  ) => {
    return folders.map((folder, idx) => (
      <div key={`folder-selectTab-${idx}`} onClick={handleTab}>
        {folder.title}
      </div>
    ));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink(e.target.value);
  };

  // 폴더 선택
  const handleTab = (e: React.MouseEvent<HTMLDivElement>) => {
    setTab((e.target as HTMLElement).textContent);
    setShow((prev) => !prev);
    // const selectedFolderID = folders.find(
    //   (folder) => folder.title === (e.target as HTMLElement).textContent,
    // ).id;
    // const res = Api.get(`folder/${selectedFolderID}`);
    // setBookmarks(res.data)
  };

  // 북마크 입력
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setBookmarks((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          title: "",
          image: "",
          content: "",
          link: newLink,
        },
      ]);
      setNewLink("");
    }
  };

  const handleClickAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setBookmarks((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        title: "",
        image: "",
        content: "",
        link: newLink,
      },
    ]);
    setNewLink("");
  };

  const handleClickRemove =
    (idx: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setBookmarks(bookmarks.filter((_, i) => i !== idx));
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
                {bookmarks.map((bookmark, idx) => (
                  <Row key={`postBookmark-${idx}`}>
                    <span>{bookmark.title}</span>
                    <span>{bookmark.link}</span>
                    <button onClick={handleClickRemove(idx)}>X</button>
                  </Row>
                ))}
              </Col>
            </Row>
            <Row>
              <Input
                value={newLink}
                onChange={handleChange}
                placeholder="북마크를 입력해주세요"
                onKeyPress={handleKeyPress}
              ></Input>
              <button onClick={handleClickAdd}>
                <span>등록</span>
              </button>
            </Row>
          </Col>
        </Modal.Body>
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
