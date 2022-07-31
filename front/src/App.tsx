import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import GlobalStyle from "./style/GlobalStyle";
import Main from "./layout/Main";
import Community from "./community/Community";
import CommunityPage from "./community/CommunityPage";
import CommunityPostDetail from "./community/CommunityPostDetail";
import CommunityPostWrite from "./community/CommunityPostWrite";
import CommunitySearch from "./community/CommunitySearch";
import { Mypage } from "./mypage/MyPage";
import CallBackKakaoLogin from "./auth/callBackKakaoLogin";
import CallBackGoogleLogin from "./auth/callBackGoogleLogin";
import MypageBookmarkDetail from "./mypage/MyPageBookMarkDetail";
import Login from "./auth/Login";
import Config from "config/Config";
import Search from "search/Search";
import TeamPage from "./team/TeamPage";
import TeamPageMain from "./team/TeamPageMain";
import TeamPageDetail from "./team/TeamPageDetail";
import TeamInvited from "./team/TeamInvited";
import { UserProvider } from "store/userStore";
import NotFound from "layout/NotFound";

// export const KeyboardContext: any = createContext(null);
export const SideBarContext: any = createContext(null);

const iconList = [
  { title: "프로필", className: "pe-7s-user", focused: false },
  { title: "홈", className: "pe-7s-home", focused: false },
  { title: "나의 북마크", className: "pe-7s-folder", focused: false },
  { title: "커뮤니티", className: "pe-7s-global", focused: false },
  { title: "그룹 북마크", className: "pe-7s-users", focused: false },
  // { title: "통합 검색", className: "pe-7s-search" },
  { title: "설정", className: "pe-7s-config", focused: false },
];

const App: React.FC = () => {
  const sidebarReducer = (state: any, action: any) => {
    switch (action.type) {
      case "pe-7s-folder":
        state = state.map((icon: any) => {
          if (icon.className === action.type) {
            return { ...icon, focused: true };
          }
          return { ...icon, focused: false };
        });
        return state;
      case "pe-7s-global":
        state = state.map((icon: any) => {
          if (icon.className === action.type) {
            return { ...icon, focused: true };
          }
          return { ...icon, focused: false };
        });
        return state;

      case "pe-7s-user":
        state = state.map((icon: any) => {
          if (icon.className === action.type) {
            return { ...icon, focused: true };
          }
          if (icon.className === "pe-7s-config") {
            return { ...icon, focused: false };
          }
          return { ...icon };
        });
        return state;

      case "pe-7s-users":
        state = state.map((icon: any) => {
          if (icon.className === action.type) {
            return { ...icon, focused: true };
          }
          return { ...icon, focused: false };
        });
        return state;

      case "pe-7s-config":
        state = state.map((icon: any) => {
          if (icon.className === action.type) {
            return { ...icon, focused: true };
          }
          if (icon.className === "pe-7s-user") {
            return { ...icon, focused: false };
          }
          return { ...icon };
        });
        return state;

      case "hide-config":
        state = state.map((icon: any) => {
          if (icon.className === "pe-7s-config") {
            return { ...icon, focused: false };
          }
          return { ...icon };
        });
        return state;

      case "hide-user":
        state = state.map((icon: any) => {
          if (icon.className === "pe-7s-user") {
            return { ...icon, focused: false };
          }
          return { ...icon };
        });
        return state;

      default:
        return state;
    }
  };
  const [sidebarState, dispatcher] = useReducer(sidebarReducer, [...iconList]);

  // const sidebarReducer = (state: any, action: any) => {
  //   switch (action.type) {
  //     case "PUSH_SIDEBAR":
  //       return {
  //         sidebar: !state.sidebar,
  //       };
  //   }
  // };
  // const [sidebarState, dispatcher] = useReducer(sidebarReducer, {
  //   sidebar: true,
  // });

  // keyboard 단축키로 사이드바 숨기기 기능
  // document.onkeyup = function (e) {
  //   // let ctrl = e.ctrlKey;
  //   // let shift = e.shiftKey;
  //   // let key = 95;
  //   let alt = e.altKey;
  //   let key = 72;
  //   if (alt && key) {
  //     console.log("단축키 눌렀습니다!");
  //     dispatcher({ type: "PUSH_SIDEBAR" });
  //   }
  // };

  React.useEffect(() => {
    const callback = (e: any) => {
      const { ctrlKey, keyCode } = e;
      const k_keyCode = 75;
      if (ctrlKey && keyCode === k_keyCode) {
        console.log("ctrl + k");
      }
    };
    window.addEventListener("keydown", callback);

    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <UserProvider>
      {/* <KeyboardContext.Provider value={sidebarState}> */}
      <ThemeProvider theme={theme}>
        <SideBarContext.Provider value={{ sidebarState, dispatcher }}>
          <Router>
            <GlobalStyle />

            <Routes>
              <Route
                path="/callback/login/kakao"
                element={<CallBackKakaoLogin />}
              />
              <Route
                path="/callback/login/google"
                element={<CallBackGoogleLogin />}
              />
              <Route path="/" element={<Main />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/community" element={<Community />}>
                <Route path="" element={<CommunityPage />} />
                <Route path=":postId" element={<CommunityPostDetail />} />
                <Route path="write" element={<CommunityPostWrite />} />
                <Route path="search" element={<CommunitySearch />} />
              </Route>
              <Route path="/bookmark" element={<Mypage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/bookmark/:folderId/"
                element={<MypageBookmarkDetail />}
              />
              <Route path="/config" element={<Config />} />
              <Route path="/search" element={<Search />} />
              <Route path="/team" element={<TeamPage />}>
                <Route path=":teamid" element={<TeamPageMain />} />
                <Route path=":teamid/:folderId" element={<TeamPageDetail />} />
              </Route>
              <Route path="/invited/:token" element={<TeamInvited />} />
            </Routes>
          </Router>
        </SideBarContext.Provider>
      </ThemeProvider>
      {/* </KeyboardContext.Provider> */}
    </UserProvider>
  );
};

export default App;
