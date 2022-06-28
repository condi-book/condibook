import GlobalAddBookmarkButton from "GlobalAddBookMarkButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../api";
import Profile from "../user/Profile";

const iconList = [
  { title: "프로필", className: "pe-7s-user" },
  { title: "홈", className: "pe-7s-home" },
  { title: "나의 북마크", className: "pe-7s-folder" },
  { title: "커뮤니티", className: "pe-7s-global" },
  { title: "그룹 북마크", className: "pe-7s-users" },
  { title: "통합 검색", className: "pe-7s-search" },
  { title: "설정", className: "pe-7s-config" },
];

const SideBar = () => {
  useEffect(() => {
    Api.get(`user/info`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const [show, setShow] = useState(false);
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();

  const handleApply = (value: any) => setData(value);

  // 프로필 수정 내용 변경 함수
  const handleChange = (e: any) => {
    setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.id === "pe-7s-user") {
      setShow((prev: boolean) => !prev);
    }
    if (e.currentTarget.id === "pe-7s-home") {
      navigate("/");
    }
    if (e.currentTarget.id === "pe-7s-folder") {
      navigate("/bookmark");
    }
    if (e.currentTarget.id === "pe-7s-global") {
      navigate("/community");
    }
    if (e.currentTarget.id === "pe-7s-search") {
      navigate("/search");
    }
    if (e.currentTarget.id === "pe-7s-config") {
      navigate("/config");
    }
    if (e.currentTarget.id === "pe-7s-users") {
      navigate("/team");
    }
  };

  return (
    <>
      <Div>
        <Section>
          {iconList.map((item: any, index: number) => (
            <div
              title={item.title}
              key={`icon-${index}`}
              id={item.className}
              onClick={handleClick}
            >
              <span className={item.className}></span>
            </div>
          ))}
        </Section>
      </Div>
      <GlobalAddBookmarkButton />
      {show && (
        <Profile
          data={data}
          handleApply={handleApply}
          handleChange={handleChange}
        />
      )}
    </>
  );
};

const Div = styled.div`
  height: 100vh;
  width: 70px;
  padding: 10px;
  position: sticky;
  top: 0;
`;

const Section = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 15px;
  background: ${({ theme }) => theme.profileBackground};
  div {
    text-align: center;
  }
  span {
    font-size: 1.4em;
    font-weight: bold;
    color: ${({ theme }) => theme.subBlackColor};
    padding: 5px;
    border-radius: 50%;
    background: white;

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.subBlackColor};
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      color: white;
    }
  }
`;

export default SideBar;
