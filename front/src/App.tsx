import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import { loginReducer } from "./reducer";
import Main from "./layout/Main";
import GlobalStyle from "./style/GlobalStyle";
import Community from "./community/Community";
import CommunityPage from "./community/CommunityPage";
import CommunityPostDetail from "./community/CommunityPostDetail";
<<<<<<< HEAD
import CommunityPostWrite from "./community/CommunityPostWrite";
import Footer from "./layout/Footer";
=======
>>>>>>> 54b6ba22f71e6ccd83a8bd548c3a040fc09850e6
import { Mypage } from "./mypage/MyPage";
import CallBackKakaoLogin from "./auth/callBackKakaoLogin";
import MypageBookmarkDetail from "./mypage/MyPageBookMarkDetail";
import Login from "./auth/Login";

export const UserStateContext: any = createContext(null);
export const DispatchContext: any = createContext(null);
export const KeyboardContext: any = createContext(null);

const App: React.FC = () => {
  const sidebarReducer = (state: any, action: any) => {
    switch (action.type) {
      case "PUSH_SIDEBAR":
        return {
          sidebar: !state.sidebar,
        };
    }
  };
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, { user: null });
  const [sidebarState, dispatcher] = useReducer(sidebarReducer, {
    sidebar: true,
  });

  // keyboard 단축키로 사이드바 숨기기 기능
  document.onkeyup = function (e) {
    let ctrl = e.ctrlKey;
    let shift = e.shiftKey;
    let key = 72;
    if (ctrl && shift && key) {
      console.log("단축키 눌렀습니다!");
      dispatcher({ type: "PUSH_SIDEBAR" });
    }
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
<<<<<<< HEAD
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <GlobalStyle />
            <Routes>
              <Route
                path="/callback/login/kakao"
                element={<CallBackKakaoLogin />}
              />
              <Route path="/" element={<Main />} />
              <Route path="/community" element={<Community />}>
                <Route path="" element={<CommunityPage />} />
                <Route path=":postId" element={<CommunityPostDetail />} />
                <Route path="write" element={<CommunityPostWrite />} />
              </Route>
              <Route path="/mypage" element={<Mypage />} />
              <Route
                path="/mypage/mybookmark/:group"
                element={<MypageBookmarkDetail />}
              />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
=======
        <KeyboardContext.Provider value={sidebarState}>
          <ThemeProvider theme={theme}>
            <Router>
              <GlobalStyle />
              <Routes>
                <Route
                  path="/callback/login/kakao"
                  element={<CallBackKakaoLogin />}
                />
                <Route path="/" element={<Main />} />
                <Route path="/community" element={<CommunityPage />}>
                  <Route path="userId" element={<CommunityUser />}>
                    <Route path=":postId" element={<CommunityPostDetail />} />
                  </Route>
                </Route>
                <Route path="/bookmark" element={<Mypage />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/bookmark/:group"
                  element={<MypageBookmarkDetail />}
                />
              </Routes>
            </Router>
          </ThemeProvider>
        </KeyboardContext.Provider>
>>>>>>> 54b6ba22f71e6ccd83a8bd548c3a040fc09850e6
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
