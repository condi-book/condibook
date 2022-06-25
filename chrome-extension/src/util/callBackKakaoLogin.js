import React, { useEffect } from "react";

/*global chrome*/
const CallBackKakaoLogin = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    async function sendCode() {
      const url = `http://localhost:5001/user/login/kakao`;
      return await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          code: code,
        }),
      });
    }

    sendCode()
      .then((res) => res.json())
      .then((res) => {
        const user = res.json;
        console.log(user);
        chrome.storage.local.set({ userToken: user.token }, function () {
          console.log("Value is set to " + user.token);
        });

        alert("로그인 성공");
      })
      .then(() => {
        chrome.storage.local.get(["userToken"], function (result) {
          console.log("Value currently is " + result.userToken);
        });
      });
  }, []);

  return <div>로그인 처리 중</div>;
};

export default CallBackKakaoLogin;
