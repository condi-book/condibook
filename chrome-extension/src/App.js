import PopUp from "./PopUp";
import Success from "./Success";

import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
/* global chrome */
// 탭 링크 가져오기
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(tabs[0]);

    console.log(url);
    callback(url);
  });
}

const App = () => {
  const [success, setSuccess] = useState(false);
  const handlePage = () => setSuccess(true);
  const [status, setStatus] = useState("READY");
  const [cookie, setCookie] = useState("");
  // 폴더 리스트, url
  const [folderList, setFolderList] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    chrome.cookies
      .get({ url: "http://localhost:3000", name: "userToken" })
      .then(async (res) => {
        const cookies = res.value;
        setCookie(cookies);
        await console.log(res.value);
        await getCurrentTabUrl(function (url) {
          setUrl(url);
          const answer = url;
          console.log("링크 가져오는 중");
          console.log("링크 값", answer);
          fetch("http://localhost:5001/websites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
            mode: "cors",
            body: JSON.stringify({
              url: answer,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setTitle(data.website.meta_title);
              const copied = Array.from(data.folders);
              console.log(copied);
              setFolderList(copied);
            })
            .catch((err) => {
              console.log("에러났어요");
              setStatus("ERROR");
            });
        });

        // mock api 연결 -> 폴더 리스트 가져오기
        // await fetch("https://jsonplaceholder.typicode.com/users")
        //   .then((response) => response.json())
        //   .then((json) => setFolderList(json.map((item) => item.name)));
        await setStatus("SUCCESS");
      })
      .catch((err) => setStatus("FAIL"));
  }, []);
  // 토큰 받아오기

  if (status === "READY") {
    return <div>로딩중입니다</div>;
  } else if (status === "SUCCESS") {
    return (
      <>
        {!success ? (
          <PopUp
            handlePage={handlePage}
            url={url}
            folderList={folderList}
            title={title}
            cookie={cookie}
          />
        ) : (
          <Success />
        )}
      </>
    );
  } else {
    return <LoginButton />;
  }
};

export default App;
