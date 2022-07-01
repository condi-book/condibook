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
  const [bookmarkModifiedID, setBookmarkModifiedID] =
    React.useState<number>(null);

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
  const handleTab = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setTab((e.target as HTMLElement).textContent);
      setShow((prev) => !prev);
    },
    [folders],
  );

  // 포스트 추가할 북마크 선택
  const onCheckedElement = React.useCallback(
    (checked: boolean, id: number) => {
      if (checked) {
        setSelectedFolderBookmarks((prev) => {
          return prev.map((item) => {
            if (item.id === id) {
              return { ...item, checked: true };
            }
            return item;
          });
        });
        setBookmarkModifiedID(id);
      } else {
        setSelectedFolderBookmarks((current) => {
          return current.map((bookmark) => {
            if (bookmark.id === id) {
              return { ...bookmark, checked: false };
            }
            return bookmark;
          });
        });
        setBookmarkModifiedID(id);
      }
    },
    [selectedFolderBookmarks],
  );

  // 북마크 입력
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const selectedFolderID = folders.find((folder) => folder.title === tab).id;

    if (e.key === "Enter") {
      try {
        const res = await Api.post("websites", {
          url: newLink,
        });
        await Api.post(`bookmarks`, {
          folder_id: selectedFolderID,
          website_id: res.data.website.id,
        });
      } catch (e) {
        alert(`err: ${e}`);
      }

      fetchFolderBookmarkData(selectedFolderID);
      setNewLink("");
    }
  };

  // 북마크 입력
  const handleClickAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const selectedFolderID = folders.find((folder) => folder.title === tab).id;
    try {
      const res = await Api.post("websites", {
        url: newLink,
      });
      await Api.post(`bookmarks`, {
        folder_id: selectedFolderID,
        website_id: res.data.website.id,
      });
    } catch (e) {
      alert(`err: ${e}`);
    }

    fetchFolderBookmarkData(selectedFolderID);

    setNewLink("");
  };

  // 완료버튼을 누르면 모달을 닫기
  const handleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalShow(false);
  };

  // 폴더 데이터 가져오기
  const fetchFolderData = async () => {
    try {
      const { data } = await Api.get("user/folders");
      setFolders(data);
    } catch (err) {
      alert(err);
    }
  };

  // 폴더 북마크 데이터 가져오기
  const fetchFolderBookmarkData = async (selectedFolderID: string) => {
    try {
      const { data } = await Api.get(`folders/${selectedFolderID}/bookmarks`);
      const handledData = data.bookmarks.map((data: any) => {
        const checkedBookmarkURL = postBookmarks
          ?.filter((bookmark) => bookmark.checked === true)
          .map((bookmark) => bookmark.url);

        return {
          id: data.bookmark_id,
          url: data.website.url,
          checked: checkedBookmarkURL?.includes(data.website.url)
            ? true
            : false,
        };
      });
      setSelectedFolderBookmarks(handledData);
    } catch (e) {
      alert(`err: ${e}`);
    }
  };

  // 유저의 폴더 데이터 가져오기
  React.useEffect(() => {
    fetchFolderData();
  }, []);

  // 유저가 선택한 북마크 데이터 세팅 (warning 방지용)
  React.useEffect(() => {
    if (bookmarkModifiedID) {
      const checkedBookmark = postBookmarks.find(
        (postBookmark) => postBookmark.id === bookmarkModifiedID,
      ); // id 같은게 있는지 확인
      if (checkedBookmark) {
        setPostBookmarks((prev) => {
          return prev.filter((bookmark) => bookmark.id !== bookmarkModifiedID);
        }); // 같은게 있으면 지움
        setBookmarkModifiedID(null);
      } else {
        setPostBookmarks((prev) => {
          const newBookmark = selectedFolderBookmarks.find(
            (bookmark) => bookmark.id === bookmarkModifiedID,
          );
          return [...prev, newBookmark];
        }); // 같은게 없으면 추가
        setBookmarkModifiedID(null);
      }
    }
  }, [bookmarkModifiedID, selectedFolderBookmarks, postBookmarks]);

  React.useEffect(() => {
    if (tab !== "폴더를 선택하세요") {
      fetchFolderBookmarkData(
        folders.find((folder) => folder.title === tab)?.id,
      );
    }
  }, [tab]);

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
                      onChange={(e) => {
                        onCheckedElement(
                          e.target.checked,
                          parseInt(e.target.value),
                        );
                      }}
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
  padding-right: 5px;
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
