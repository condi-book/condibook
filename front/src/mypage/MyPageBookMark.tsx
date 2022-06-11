import React from "react";

import MypageBookmarkLayout from "./MyPageBookMarkLayout";

export interface MypageBookmarkProps {
  data: {
    image: string;
    group: string;
    link_num: number;
    favorite: boolean;
  }[];
  title: string;
}

const MypageBookmark = () => {
  const data: MypageBookmarkProps["data"] = [
    {
      image: "url",
      group: "프론트엔드",
      link_num: 3,
      favorite: true,
    },
    {
      image: "url",
      group: "백엔드",
      link_num: 3,
      favorite: false,
    },
    {
      image: "url",
      group: "AI",
      link_num: 3,
      favorite: true,
    },
    {
      image: "url",
      group: "엘리스",
      link_num: 3,
      favorite: false,
    },
    {
      image: "url",
      group: "14팀",
      link_num: 3,
      favorite: true,
    },
    {
      image: "url",
      group: "14팀",
      link_num: 3,
      favorite: true,
    },
    {
      image: "url",
      group: "14팀",
      link_num: 3,
      favorite: true,
    },
  ];

  const filteredData: MypageBookmarkProps["data"] = data.filter(
    (item) => item.favorite === true,
  );

  const title1 = "즐겨찾기";
  const title2 = "전체보기";

  return (
    <div>
      <MypageBookmarkLayout data={filteredData} title={title1} />
      <MypageBookmarkLayout data={data} title={title2} />
    </div>
  );
};

export default MypageBookmark;
