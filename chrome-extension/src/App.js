import PopUp from "./PopUp";
import Success from "./Success";

import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import Loading from "./Loading";
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
  const [id, setId] = useState("");

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
          console.log(cookies);
          fetch("http://localhost:5001/websites", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies}`,
            },
            mode: "cors",
            body: JSON.stringify({
              url: answer,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setTitle(data.website.meta_title);
              setId(data.website.id);
              const copied = Array.from(data.folders);
              copied.push({ title: "직접입력", id: 0 });
              console.log(copied);
              setFolderList(copied);
            })
            .catch((err) => {
              console.log(err.message);
              console.log("에러났어요");
              setStatus("FAIL");
            });
        });

        await setStatus("SUCCESS");
      })
      .catch((err) => setStatus("FAIL"));
  }, []);

  if (status === "SUCCESS") {
    return (
      <>
        {!success ? (
          <PopUp
            handlePage={handlePage}
            url={url}
            folderList={folderList}
            title={title}
            cookie={cookie}
            id={id}
          />
        ) : (
          <Success />
        )}
      </>
    );
  } else if (status === "FAIL") {
    return <LoginButton />;
  } else {
    return <Loading />;
  }
};

export default App;
