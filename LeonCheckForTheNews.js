function checkShowNewsValue() {
  const ref = firebase.database().ref("show-news");
  ref.on(
    "value",
    (snapshot) => {
      const value = snapshot.val();

      if (value.news === true) {
        document.getElementById("displayImportantNews").style.display = "block";
        fetch(
          "https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=d145f497889e4b729d11b61c744f1561"
        )
          .then((response) => response.json())
          .then((data) => {
            let importantNews = data.articles.slice(0, 3);
            let displayArea = document.getElementById("importantNewsBody");
            displayArea.innerHTML = "";

            importantNews.forEach((article) => {
              displayArea.innerHTML += `
                  <li>
                    <h4>${article.title}</h4>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                  </li>
                `;
            });

            document.getElementById("displayImportantNews").style.display =
              importantNews.length > 0 ? "block" : "none";
          })
          .catch((error) => console.error(error));
      } else {
        hideTheNews();
        document.getElementById("displayImportantNews").style.display = "none";
      }
    },
    (error) => {
      console.error("Error retrieving the value:", error);
    }
  );
}

window.onload = function () {
  checkShowNewsValue();
};
