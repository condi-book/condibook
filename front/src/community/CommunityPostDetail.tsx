import React from "react";
import { useParams } from "react-router-dom";

// import * from "../Api";

const CommunityPostDetail = () => {
  const params = useParams();

  React.useEffect(() => {
    console.log(params);
  }, []);
  return <p>게시글 디테일 페이지 입니다.</p>;
};

export default CommunityPostDetail;
