import PopUp from "./PopUp";
import Success from "./Success";
import GlobalStyle from "./GlobalStyle";
import { useState, useEffect } from "react";
import KakaoLoginBtn from "./util/kakaoLoginBtn";

const App = () => {
  const [success, setSuccess] = useState(false);
  const handlePage = () => setSuccess(true);

  return (
    <>
      {" "}
      <KakaoLoginBtn />
      {!success ? <PopUp handlePage={handlePage} /> : <Success />}
    </>
  );
};

export default App;
