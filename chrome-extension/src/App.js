/* global chrome */
import styled from "styled-components";
import FolderSelect from "./FolderSelect";

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs.query(queryInfo, function (tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.log(url);
    callback(url);
  });
}

function renderURL(statusText) {
  // if (statusText.length >= 30) {
  //   statusText = statusText.substring(0, 30) + "...";
  // }
  // document.getElementById("link-url").textContent = statusText;
  console.log(statusText, "renderURL");
}

// document.getElementById("getUrl").addEventListener("click", handleSubmit);
// function handleSubmit() {
//   const linkTitle = document.getElementById("link-title").value;
//   const linkUrl = document.getElementById("link-url").value;
//   const linkDescription = document.getElementById("explanation").value;
//   const data = {
//     title: linkTitle,
//     url: linkUrl,
//     description: linkDescription,
//     tag: ["api", "chrome", "extension"],
//   };
//   console.log(data);
//   alert("링크가 저장되었습니다.");
// }

function App() {
  // getCurrentTabUrl(function (url) {
  //   renderURL(url);
  //   const answer = url;
  //   console.log("링크 가져오는 중");
  //   fetch("http://localhost:5001/website", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     mode: "cors",
  //     body: JSON.stringify({
  //       url: answer,
  //     }),
  //   })
  //     .then((res) => {
  //       const data = res.json();
  //       console.log(data);
  //       return data;
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       // document.getElementById("link-title").value = data.meta_title;
  //       // document.getElementById("link-url").value = data.url;
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
  return (
    <Div className="App">
      <div className="login">
        <button>로그인</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="top-box">
            <img alt="logo" />
            <button>나의 북마크로 이동</button>
          </div>
        </div>
        <div className="middle">
          <div>
            <div className="link-section">
              <div className="link-container">
                <div>
                  <img width="70px" src="./site-image.svg" alt="site-image" />
                </div>
                <div className="link-box">
                  <input
                    placeholder="제목을 입력하세요"
                    id="link-title"
                  ></input>
                  <div id="link-url">link</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="box">
            <div className="loader10"></div>
            <div className="loading-text">키워드 분석 중 입니다.</div>
          </div> */}
          <FolderSelect />
        </div>
        <div className="bottom">
          <button id="getUrl">저장하기</button>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  width: 300px;
  height: 400px;
  margin: 0;
  padding: 0;
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
  .container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top {
    height: 15%;
  }

  .top img {
    margin: 10px;
    height: 30%;
  }
  .bottom {
    width: 100%;
    height: 15%;
  }
  .middle {
    width: 100%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #f8f9fc;
  }
  #getUrl {
    width: 100%;
    height: 90%;
    margin: auto;
    border: none;
    border-radius: 10px;
  }
  #getUrl:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
  textarea {
    width: -webkit-fill-available;
    height: 60px;
    border: none;
    background-color: white;
    margin: 5px;
    border-radius: 10px;
    resize: none;
  }
  .link-section div {
    margin: 5px;
    background-color: white;
    border-radius: 10px;
  }
  .link-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .link-box input {
    border: none;
    background-color: #f8f9fc;
    border-radius: 10px;
    padding: 5px;
  }
  #link-url {
    font-size: 11px;
  }
  .box {
    background: linear-gradient(
      135deg,
      #12c2e9 19.08%,
      #c471ed 49.78%,
      #f64f59 78.71%
    );
    height: 100px;
  }
  .loading-text {
    text-align: center;
    color: white;
    font-weight: bold;
    padding-bottom: 10px;
    margin: 60px;
  }
  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px;
  }
  .login {
    height: 100%;
    width: 100%;
    display: none;
    justify-content: center;
    align-items: center;
  }
`;

export default App;
