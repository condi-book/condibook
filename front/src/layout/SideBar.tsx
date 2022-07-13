import Config from "config/Config";
import GlobalAddBookmarkButton from "GlobalAddBookMarkButton";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../api";
import Profile from "../user/Profile";
import { SideBarContext } from "App";

const SideBar = () => {
  const sideBarContext = useContext<any>(SideBarContext);

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
      if (show) {
        sideBarContext.dispatcher({ type: "hide-user" });
      } else {
        sideBarContext.dispatcher({ type: "pe-7s-user" });
      }
    }
    if (e.currentTarget.id === "pe-7s-home") {
      navigate("/");
    }
    if (e.currentTarget.id === "pe-7s-folder") {
      navigate("/bookmark");
      sideBarContext.dispatcher({ type: "pe-7s-folder" });
    }
    if (e.currentTarget.id === "pe-7s-global") {
      navigate("/community");
      sideBarContext.dispatcher({ type: "pe-7s-global" });
    }
    // if (e.currentTarget.id === "pe-7s-search") {
    //   navigate("/search");
    // }
    if (e.currentTarget.id === "pe-7s-config") {
      setConfigShow((prev: boolean) => !prev);
      if (configShow) {
        sideBarContext.dispatcher({ type: "hide-config" });
      } else {
        sideBarContext.dispatcher({ type: "pe-7s-config" });
      }
    }
    if (e.currentTarget.id === "pe-7s-users") {
      navigate("/team");
      sideBarContext.dispatcher({ type: "pe-7s-users" });
    }
  };
  // useEffect(() => {
  //   setIcons(
  //     iconList.map((icon: any) => {
  //       if (icon.title === "나의 북마크") {
  //         return { ...icon, focused: true };
  //       }
  //       return { ...icon, focused: false };
  //     }),
  //   );
  // }, []);

  return (
    <>
      <Div>
        <Section>
          {sideBarContext.sidebarState.map((item: any, index: number) => (
            <Icon
              title={item.title}
              key={`icon-${index}`}
              id={item.className}
              onClick={handleClick}
            >
              <span
                className={`${item.className} sub-icon ${
                  item.focused && "focused"
                }`}
              ></span>
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
  width: 6vw;
  padding: 1vw;
  position: sticky;
  top: 0;
`;

const Section = styled.section`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 15px;
  position: sticky;
  top: 0;
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

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.subBlackColor};
      color: white;
    }
  }

  .focused {
    background: ${({ theme }) => theme.subBlackColor};
    color: white;
  }

  .sub-title {
    margin-top: 5px;
    font-size: 0.7vw;
    color: white;
    font-weight: bold;
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default SideBar;
