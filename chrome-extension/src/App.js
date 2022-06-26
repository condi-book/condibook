import PopUp from "./PopUp";
import Success from "./Success";

import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import styled from "styled-components";
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
            .then((res) => {
              return res.json(); //Promise 반환
            })
            .then((data) => {
              setTitle(data.website.meta_title);
              setId(data.website.id);
              const copied = Array.from(data.folders);
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
  // 토큰 받아오기

  if (status === "READY") {
    return (
      <Loading>
        <div className="loader10"></div>
      </Loading>
    );
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
            id={id}
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

const Loading = styled.div`
  height: 400px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;

  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  .loader10:before {
    content: "";
    position: absolute;
    top: 0px;
    left: -25px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    -webkit-animation: loader10g 3s ease-in-out infinite;
    animation: loader10g 3s ease-in-out infinite;
  }

  .loader10 {
    position: relative;
    width: 12px;
    height: 12px;
    top: 46%;
    left: 46%;
    border-radius: 12px;
    -webkit-animation: loader10m 3s ease-in-out infinite;
    animation: loader10m 3s ease-in-out infinite;
  }

  .loader10:after {
    content: "";
    position: absolute;
    top: 0px;
    left: 25px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    -webkit-animation: loader10d 3s ease-in-out infinite;
    animation: loader10d 3s ease-in-out infinite;
  }

  @-webkit-keyframes loader10g {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    25% {
      background-color: rgba(255, 255, 255, 1);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    75% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  @keyframes loader10g {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    25% {
      background-color: rgba(255, 255, 255, 1);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    75% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  @-webkit-keyframes loader10m {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    25% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    50% {
      background-color: rgba(255, 255, 255, 1);
    }
    75% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  @keyframes loader10m {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    25% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    50% {
      background-color: rgba(255, 255, 255, 1);
    }
    75% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }

  @-webkit-keyframes loader10d {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    25% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    75% {
      background-color: rgba(255, 255, 255, 1);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  @keyframes loader10d {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    25% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    75% {
      background-color: rgba(255, 255, 255, 1);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

export default App;
