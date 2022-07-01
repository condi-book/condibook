import Config from "config/Config";
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
  const [configShow, setConfigShow] = useState(false);
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();

  const handleApply = (value: any) => setData(value);
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
      setConfigShow((prev: boolean) => !prev);
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
            <Icon
              title={item.title}
              key={`icon-${index}`}
              id={item.className}
              onClick={handleClick}
            >
              <span className={`${item.className} sub-icon`}></span>
              <span className="sub-title">{item.title}</span>
            </Icon>
          ))}
        </Section>
      </Div>
      <GlobalAddBookmarkButton />
      {show && <Profile data={data} handleApply={handleApply} />}
      {configShow && <Config />}
    </>
  );
};

const Div = styled.div`
  height: 100vh;
  width: 6%;
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
  .sub-icon {
    font-size: 2vw;
    font-weight: bold;
    color: ${({ theme }) => theme.subBlackColor};
    padding: 5px;
    border-radius: 50%;
    background: white;
    width: 70%;

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.subBlackColor};
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      color: white;
    }
  }

  .sub-title {
    font-size: 0.3vw;
    color: white;
    font-weight: bold;
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default SideBar;
