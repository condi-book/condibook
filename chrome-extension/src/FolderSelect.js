const FolderSelect = ({
  data,
  handlePage,
  cookie,
  url,
  id,
  folder,
  handleFolderChange,
  handleInputChange,
  input,
  inputValue,
}) => {
  // 제출 이벤트
  const handleClick = () => {
    const folderId = data.folders.find((f) => f.title === folder).id;
    if (inputValue) {
      fetch("https://condibook.site/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        mode: "cors",
        body: JSON.stringify({
          folder_name: inputValue,
          website_id: id,
        }),
      }).then((res) => {
        handlePage();
        console.log("성공");
      });
    } else if (folderId !== null) {
      fetch("https://condibook.site/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        mode: "cors",
        body: JSON.stringify({
          folder_id: folderId,
          website_id: data.website.id,
        }),
      }).then((res) => {
        handlePage();
        console.log("성공");
        console.log(folderId, id);
      });
    } else if (folderId === null) {
      fetch("https://condibook.site/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
        mode: "cors",
        body: JSON.stringify({
          folder_name: folder,
          website_id: data.website.id,
        }),
      }).then((res) => {
        handlePage();
        console.log("성공");
      });
    } else {
      alert("선택된 폴더가 없습니다.");
    }
  };

  return (
    <>
      <div id="confirm-folder">
        <div id="title">* AI 추천 폴더 *</div>
        <div id="category">{data?.category?.category}</div>
      </div>
      <div className="popup">
        <div className="popup-container">
          <div>
            <div id="label">저장 폴더 *</div>
            <select
              defaultValue={data?.category?.category}
              className="select"
              name="category"
              onChange={handleFolderChange}
            >
              {data?.folders?.map((item) => (
                <option key={`option-${item.title}`} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            className="input"
            value={inputValue}
            placeholder={input ? "폴더명을 입력하세요" : ""}
            disabled={input ? false : true}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <div className="bottom">
        <button id="getUrl" onClick={handleClick}>
          저장하기
        </button>
      </div>
    </>
  );
};

// const Section = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;
//   height: 100%;

//   #confirm-folder {
//     font-weight: bold;
//     font-size: 20px;
//     padding: 20px;
//   }
// `;

// const SubmitButton = styled.div`
//   height: 100px;

//   #getUrl {
//     height: 100%;
//   }
// `;
// const Div = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: space-around;
//   align-items: flex-end;

//   #label {
//     margin-bottom: 10px;
//     font-weight: bold;
//   }
// `;

// const Select = styled.select`
//   width: 130px;
//   height: 35px;
// `;

// const Input = styled.input`
//   width: 130px;
//   height: 35px;
//   box-sizing: border-box;
// `;

export default FolderSelect;
