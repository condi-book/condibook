/* eslint-disable no-undef */
function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true,
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        callback(url);
    });
}

function renderURL(statusText) {
    document.getElementById("status").textContent = statusText;
}

document.addEventListener("DOMContentLoaded", function () {
    // when click, get current page link

    var link = document.getElementById("getUrl");

    link.addEventListener("click", function () {
        getCurrentTabUrl(function (url) {
            renderURL(url);
            const answer = url;

            fetch("http://localhost:5001/website", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    url: answer,
                }),
            })
                .then((res) => {
                    console.log(res, "성공");
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });
});
