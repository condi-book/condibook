import React, { useEffect, useState } from "react";

import MypageBookmarkList from "./MyPageBookMarkList";
import * as Api from "../api";

export interface MypageBookmarkProps {
  folderData: {
    image: string;
    title: string;
    link_num: number;
    favorites: boolean;
  }[];
  title: string;
}

const MypageBookmark = () => {
  const [folderData, setFolderData] = useState<
    MypageBookmarkProps["folderData"]
  >([]);
  useEffect(() => {
    Api.get(`folders`).then((res) => {
      setFolderData(res.data);
      console.log(res.data);
    });
  }, []);

  const filteredData: MypageBookmarkProps["folderData"] = folderData.filter(
    (item) => item.favorites === true,
  );

  const title1 = "즐겨찾기";
  const title2 = "전체보기";

  return (
    <div>
      <MypageBookmarkList folderData={filteredData} title={title1} />
      <MypageBookmarkList folderData={folderData} title={title2} />
    </div>
  );
};

export default MypageBookmark;
