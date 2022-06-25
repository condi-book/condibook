import React from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { Bookmark } from "./CommunityPostWrite";
import * as Api from "../api";

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

  const handleClickLink = (e: React.MouseEvent<HTMLDivElement>) => {
    window.open(`${e.currentTarget.innerText}`);
  };

  // url 입력시 이벤트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink(e.target.value);
  };

  // 폴더 선택
  const handleTab = (e: React.MouseEvent<HTMLDivElement>) => {
    setTab((e.target as HTMLElement).textContent);
    setShow((prev) => !prev);
    const selectedFolderID = folders.find(
      (folder) => folder.title === (e.target as HTMLElement).textContent,
    ).id;
    fetchFolderBookmarkData(selectedFolderID);
  };

  // 포스트 추가할 북마크 선택
  const handleCheckElement = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      const checkedbookmarkID = e.target.value;

      if (checked) {
        setSelectedFolderBookmarks((current) => {
          return current.map((bookmark) => {
            if (bookmark.id === checkedbookmarkID) {
              bookmark.checked = true;
              setPostBookmarks([...postBookmarks, bookmark]);
            }
            return bookmark;
          });
        });
      } else {
        setSelectedFolderBookmarks((current) => {
          return current.map((bookmark) => {
            if (bookmark.id === checkedbookmarkID) {
              bookmark.checked = false;
              setPostBookmarks(
                postBookmarks.filter(
                  (bookmark) => bookmark.id !== checkedbookmarkID,
                ),
              );
            }
            return bookmark;
          });
        });
      }
    },
    [Checkbox, postBookmarks],
  );

  // 북마크 입력
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const selectedFolderID = folders.find((folder) => folder.title === tab).id;

    if (e.key === "Enter") {
      const res = await Api.post(`folders/${selectedFolderID}/bookmarks`, {
        url: newLink,
      });
      console.log(res);
      setNewLink("");
    }
  };

  // 북마크 입력
  const handleClickAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const selectedFolderID = folders.find((folder) => folder.title === tab).id;
    await Api.post(`folders/${selectedFolderID}/bookmarks`, {
      url: newLink,
    });

    fetchFolderBookmarkData(selectedFolderID);

    setNewLink("");
  };

  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalShow(false);
  };

  const fetchFolderData = async () => {
    const { data } = await Api.get("user/folders");
    setFolders(data);
  };

  const fetchFolderBookmarkData = async (selectedFolderID: string) => {
    const { data } = await Api.get(`folders/${selectedFolderID}/bookmarks`);
    console.log(data);

    const handledData = data.map((data: any) => {
      const checkedBookmark = postBookmarks.find(
        (postBookmark) => postBookmark.id === data.bookmark_id,
      );
      return {
        id: data.bookmark_id,
        url: data.website.url,
        checked: checkedBookmark ? true : false,
      };
    });
    setSelectedFolderBookmarks(handledData);
  };

  React.useEffect(() => {
    // 유저 폴더들 불러오기
    fetchFolderData();
  }, []);

  React.useEffect(() => {
    console.log(postBookmarks);
  }, [postBookmarks]);

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
                <DropdownHeader onClick={() => setShow((prev) => !prev)}>
                  <p>{tab}</p>
                  <span className="pe-7s-angle-down" />
                </DropdownHeader>
                <div className="select">
                  <div className="scroll">{folderList(handleTab)}</div>
                </div>
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
                    <Checkbox
                      type="checkbox"
                      value={bookmark.id}
                      onChange={handleCheckElement}
                      checked={bookmark.checked}
                    />
                    <Link onClick={handleClickLink}>{bookmark.url}</Link>
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
              <Button onClick={handleClickAdd}>등록</Button>
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
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 10px;
  font-size: 14px;
  color: #000;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 10%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
  padding-left: 5px;
  padding-right: 5px
  &:checked {
    background-color: #00bcd4;
  }
`;

const Link = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  color: #000;
  word-break: break-word;
  overflow-wrap: break-word;
  overflow: scroll;
  overflow-y: scroll;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
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

    .scroll {
      overflow-y: scroll;
      overflow-x: hidden;
      height: ${({ show }) => (show ? "168px" : "50px")};
      width: 100%;
      padding: 0px;
      margin: 0px;
      border-radius: 8px;
      background-color: rgb(235, 235, 235);
      z-index: 2;
      

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
`;

const DropdownHeader = styled.div`
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
`;
