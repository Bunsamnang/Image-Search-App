const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const showMoreBtn = document.querySelector(".show-more-btn");

const accessKey = "KnZxdQw9V3nNQLLLqIR1LWW4QFG8RYfF92D0gYqRq58";
let pageNum = 1;

searchBtn.addEventListener("click", () => {
  const keyWord = searchInput.value;
  searchImage(keyWord);
});

searchInput.addEventListener("keydown", () => {
  handleKeyDown();
});

// Increase the page number when clicking show more button
showMoreBtn.addEventListener("click", () => {
  const keyWord = searchInput.value;
  pageNum += 1;
  searchImage(keyWord);
});

async function searchImage(keyWord) {
  const url = `https://api.unsplash.com/search/photos?page=${pageNum}&query=${keyWord}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  let imageContainer = "";
  data.results.forEach((result) => {
    imageContainer += `<div class = "search-result">
        <img class ="image" src = "${result.urls.small}">
        <a href = "${result.urls.small}">${result.alt_description}</a>
    </div>`;
  });

  // Add new photos to the page
  document.querySelector(".search-results").innerHTML += imageContainer;
  showMoreBtn.style.display = "block";
}

function handleKeyDown() {
  if (event.key === "Enter") {
    const keyWord = searchInput.value;
    searchImage(keyWord);
  }
}
