import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import { loginReducer } from "./reducer";
import Main from "./layout/Main";
import GlobalStyle from "./style/GlobalStyle";
import CommunityPage from "./community/CommunityPage";
import CommunityUser from "./community/CommunityUser";
import CommunityPostDetail from "./community/CommunityPostDetail";
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
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
