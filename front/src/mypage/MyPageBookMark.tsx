import React, { useEffect, useState } from "react";

import MypageBookmarkList from "./MyPageBookMarkList";
import * as Api from "../api";

export interface MypageBookmarkProps {
  folderData: {
    id: string;
    image: string;
    title: string;
    link_num: number;
    favorites: boolean;
  }[];
  title: string;
  handleRemove: (e: React.MouseEvent, value: any) => void;
}

interface BookmarkItem {
  id: number;
  image: string;
  title: string;
  link_num: number;
  favorites: boolean;
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

  useEffect(() => {
    Api.get(`folders`).then((res) => {
      setFolderData(
        res.data.map((item: BookmarkItem) => {
          return {
            id: String(item.id),
            image: item.image,
            title: item.title,
            link_num: item.link_num,
            favorites: item.favorites,
          };
        }),
      );
    });
  }, []);

  return (
    <div>
      <MypageBookmarkList
        folderData={filteredData}
        title={title1}
        handleRemove={handleRemove}
      />
      <MypageBookmarkList
        folderData={folderData}
        title={title2}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default MypageBookmark;
