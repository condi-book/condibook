function getCurrentTabUrl(callback) {  
    var queryInfo = {
      active: true, 
      currentWindow: true
    };
    
    chrome.tabs.query(queryInfo, function(tabs) {
      var tab = tabs[0]; 
      var url = tab.url;
      callback(url);
    });
  }

  function renderURL(statusText) {
    document.getElementById('status').textContent = statusText;
  }
  
  document.addEventListener('DOMContentLoaded', function() {

    // when click, get current page link
  
    var link = document.getElementById('getUrl');

    link.addEventListener('click', function() {
  
      getCurrentTabUrl(function(url) {
        renderURL(url);
        const data = url
        console.log(url)

        async function postData(url = '', data = {}) {
          // 옵션 기본 값은 *로 강조
          const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE 등
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
          });
          return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
        }
        
        postData('localhost', { data }).then((data) => {
          console.log(data); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
        });
        
      });
      

    });
  
  
  });
