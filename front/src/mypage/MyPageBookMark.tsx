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
  handleRemove: (value: any) => void;
}

const MypageBookmark = () => {
  const [folderData, setFolderData] = useState<
    MypageBookmarkProps["folderData"]
  >([]);
  useEffect(() => {
    Api.get(`folders`).then((res) => {
      setFolderData(
        res.data.map((item: any) => {
          item.id = String(item.id);
        }),
      );
      console.log(res.data);
    });
  }, []);

  // 즐겨찾기 데이터
  const filteredData: MypageBookmarkProps["folderData"] = folderData.filter(
    (item) => item.favorites === true,
  );

  const title1 = "즐겨찾기";
  const title2 = "전체보기";

  // 폴더 삭제 함수
  const handleRemove = (value: any) => {
    Api.delete(`folders`, `${value.id}`).then(() => console.log("삭제 성공"));

    const filtered = folderData.filter((item) => item.id !== value.id);
    setFolderData(filtered);
  };

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
