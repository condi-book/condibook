import PopUp from "./PopUp";
import Success from "./Success";
import { Suspense } from "react";

import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import Loading from "./Loading";
import Fail from "./Fail";
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
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [folder, setFolder] = useState("");
  // 폴더명, 직접입력 인풋 및 값 상태 관리
  const [input, setInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // 폴더 선택 이벤트
  const handleFolderChange = (e) => {
    setFolder(e.target.value);

    if (e.target.value === "직접입력") {
      setInput(true);
    } else {
      setInput(false);
      setInputValue("");
    }
  };

  // 직접입력 인풋 이벤트
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setTimeout(function () {
      chrome.cookies
        .get({
          url: "http://kdt-ai4-team14.elicecoding.com/",
          name: "userToken",
        })
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
            fetch("http://kdt-ai4-team14.elicecoding.com:5001/websites", {
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
              .then(async (data) => {
                setTitle(data.website.meta_title);
                setId(data.website.id);
                console.log(data);
                const copied = data;
                const copiedList = copied.folders.map((item) => item.title);
                await console.log("copiedlist", copiedList);
                await copied.folders.push({ title: "직접입력", id: 0 });
                if (copiedList.includes(copied.category.category)) {
                  console.log(
                    copied.folders.filter(
                      (item) => item.title === copied.category.category
                    )[0]
                  );
                  const folderList = copied.folders.filter(
                    (item) => item.title !== copied.category.category
                  );
                  folderList.unshift(
                    copied.folders.filter(
                      (item) => item.title === copied.category.category
                    )[0]
                  );
                  const realData = { ...copied, folders: folderList };

                  console.log(realData);
                  setFolder(copied.category.category);
                  setData(realData);
                } else {
                  copied.folders.unshift({
                    title: data.category.category,
                    id: null,
                  });
                  setData(copied);
                  setFolder(copied.category.category);
                }
              })
              .catch((err) => {
                console.log(err.message);
                console.log("에러났어요");
                setStatus("NOT");
              });
          });

          await setStatus("SUCCESS");
        })
        .catch((err) => setStatus("FAIL"));
    }, 2000);
  }, []);

  if (status === "SUCCESS") {
    return (
      <>
        <Suspense fallback={<Loading />}>
          {!success ? (
            <PopUp
              handlePage={handlePage}
              url={url}
              data={data}
              title={title}
              cookie={cookie}
              id={id}
              folder={folder}
              handleFolderChange={handleFolderChange}
              handleInputChange={handleInputChange}
              input={input}
              inputValue={inputValue}
            />
          ) : (
            <Success folder={folder} inputValue={inputValue} data={data} />
          )}
        </Suspense>
      </>
    );
  } else if (status === "FAIL") {
    return <LoginButton />;
  } else if (status === "NOT") {
    return <Fail />;
  } else {
    return <Loading />;
  }
};

export default App;
