import styled from "styled-components";
import FolderSelect from "./FolderSelect";

const PopUp = ({ handlePage, url, title, folderList, cookie }) => {
  // 서비스 페이지 새탭으로 열기
  const handleNavigate = () => {
    window.open("http://localhost:3000", "newWindow");
  };

  return (
    <Div className="App">
      <div className="container">
        <div className="top">
          <div className="top-box">
            <img src="/logo.png" alt="logo" width="30" />
            <Button id="navigate-page" onClick={handleNavigate}>
              나의 북마크로 이동
            </Button>
          </div>
        </div>
        <div className="middle">
          <div>
            <div className="link-section">
              <div className="link-container">
                <div>
                  <img width="60px" src="/site-image.svg" alt="site-image" />
                </div>
                <div className="link-box">
                  <div id="link-title">{title}</div>
                  <div id="link-url">
                    {url?.length >= 20 ? `${url.substring(0, 20)}...` : url}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="box">
            <div className="loader10"></div>
            <div className="loading-text">키워드 분석 중 입니다.</div>
          </div> */}
          <FolderSelect
            folderList={folderList}
            handlePage={handlePage}
            cookie={cookie}
          />
        </div>
      </div>
    </Div>
  );
};

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

  .middle {
    width: 100%;
    height: 75%;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fc;
    margin-bottom: 10px;
    justify-content: space-around;
  }
  #getUrl {
    width: 100%;
    height: 90%;
    margin: auto;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    font-size: 15px;
  }
  #getUrl:hover {
    background: linear-gradient(135deg, #12c2e9, #c471ed, #f64f59);
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

  .link-section {
    margin-bottom: 30px;
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
  .link-box {
    width: 130px;
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

  .popup {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    #confirm-folder {
      font-weight: bold;
      font-size: 20px;
      padding: 20px;
    }
  }

  .bottom {
    height: 100px;

    #getUrl {
      height: 100%;
    }
  }

  .popup-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: flex-end;

    #label {
      margin-bottom: 10px;
      font-weight: bold;
    }
  }

  .select {
    width: 130px;
    height: 35px;
  }

  .input {
    width: 130px;
    height: 35px;
    box-sizing: border-box;
  }
`;
const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #12c2e9, #c471ed, #f64f59);
    color: white;
  }
`;

export default PopUp;
