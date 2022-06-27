import React, { useEffect, useState } from "react";

import MypageBookmarkList from "./MyPageBookMarkList";
import * as Api from "../api";

export interface MypageBookmarkProps {
  folderData: {
    id: string;
    image: string;
    title: string;
    favorites: boolean;
    createdAt: string;
    bookmarkCount: number;
  }[];
  title: string;
  handleRemove: (e: React.MouseEvent, value: any) => void;
  handlePushData: (value: BookmarkItem) => void;
}

interface BookmarkItem {
  id: string;
  image: string;
  title: string;
  favorites: boolean;
  createdAt: string;
  bookmarkCount: number;
}

const MypageBookmark = () => {
  const [folderData, setFolderData] = useState<
    MypageBookmarkProps["folderData"]
  >([]);

  // 즐겨찾기 데이터
  const filteredData: MypageBookmarkProps["folderData"] = React.useMemo(() => {
    if (folderData.length) {
      return folderData.filter((item) => item.favorites === true);
    }
    return [];
  }, [folderData]);

  const title1 = "즐겨찾기";
  const title2 = "전체보기";

  // 폴더 삭제 함수
  const handleRemove = (e: React.MouseEvent, value: any) => {
    e.stopPropagation();
    Api.delete(`folders`, `${value.id}`).then(() => console.log("삭제 성공"));

    const filtered = folderData.filter((item) => item.id !== value.id);
    setFolderData(filtered);
  };

  const handlePushData = (value: BookmarkItem) => {
    const copied = [...folderData];
    copied.splice(0, 0, value);

    setFolderData(copied);
  };

  useEffect(() => {
    Api.get(`user/folders`).then((res) => {
      console.log(res.data);
      const data = res.data.map((item: BookmarkItem) => ({
        id: String(item.id),
        image: item.image,
        title: item.title,
        favorites: item.favorites,
        createdAt: item.createdAt,
        bookmarkCount: item.bookmarkCount,
      }));
      const orderedData = data.sort(
        (a: any, b: any) => +new Date(b.createdAt) - +new Date(a.createdAt),
      );
      setFolderData(orderedData);
    });
  }, []);

  return (
    <div>
      <MypageBookmarkList
        folderData={filteredData}
        title={title1}
        handleRemove={handleRemove}
        handlePushData={handlePushData}
      />
      <MypageBookmarkList
        folderData={folderData}
        title={title2}
        handleRemove={handleRemove}
        handlePushData={handlePushData}
      />
    </div>
  );
};

export default MypageBookmark;
