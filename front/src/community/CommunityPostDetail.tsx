import React from "react";
import { useParams } from "react-router-dom";

// import * from "../Api";

const CommunityPostDetail = () => {
  const params = useParams();

  React.useEffect(() => {
    console.log(params);
  }, []);
  return <></>;
};

export default CommunityPostDetail;
