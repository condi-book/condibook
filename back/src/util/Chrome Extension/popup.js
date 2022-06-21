/* eslint-disable no-undef */

function pageMove() {
    if (sessionStorage) {
        document.getElementsByClassName("container")[0].style.display = "none";
    }
}

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
    if (statusText.length >= 30) {
        statusText = statusText.substring(0, 30) + "...";
    }
    document.getElementById("link-url").textContent = statusText;
}

document.addEventListener("DOMContentLoaded", function () {
    // pageMove();
    document.getElementById("getUrl").addEventListener("click", handleSubmit);
    function handleSubmit() {
        const linkTitle = document.getElementById("link-title").value;
        const linkUrl = document.getElementById("link-url").value;
        const linkDescription = document.getElementById("explanation").value;
        const data = {
            title: linkTitle,
            url: linkUrl,
            description: linkDescription,
            tag: ["api", "chrome", "extension"],
        };
        console.log(data);
        alert("링크가 저장되었습니다.");
        location.href = "./success.html";
    }

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
                const data = res.json();
                console.log(data);
                return data;
            })
            .then((data) => {
                console.log(data);
                document.getElementById("link-title").value = data.meta_title;
                document.getElementById("link-url").value = data.url;
            })

            .catch((err) => {
                console.log(err);
            });
    });
});
