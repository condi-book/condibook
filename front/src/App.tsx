import React, { useReducer, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import { loginReducer } from "./reducer";
import Header from "./layout/Header";
import Main from "./layout/Main";
import GlobalStyle from "./style/GlobalStyle";
import CommunityPage from "./community/CommunityPage";
import Footer from "./layout/Footer";
import { Mypage } from "./mypage/MyPage";
import CallBackKakaoLogin from "./callBackKakaoLogin";
import MypageBookmarkDetail from "./mypage/MyPageBookMarkDetail";

export const UserStateContext: any = createContext(null);
export const DispatchContext: any = createContext(null);

const App: React.FC = () => {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, { user: null });

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
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
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route
                path="/mypage/mybookmark/:group"
                element={<MypageBookmarkDetail />}
              />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
