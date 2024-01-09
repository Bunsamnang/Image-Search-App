const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const showMoreBtn = document.querySelector(".show-more-btn");

const accessKey = "KnZxdQw9V3nNQLLLqIR1LWW4QFG8RYfF92D0gYqRq58";
let pageNum = 1;

// initialize isShowMore to be false
let isShowMore = false;
searchBtn.addEventListener("click", () => {
  isShowMore = false;
  // Set pageNum to 1 every time a new type of image is searched
  pageNum = 1;
  const keyWord = searchInput.value;
  searchImage(keyWord);
});

searchInput.addEventListener("keydown", () => {
  isShowMore = false;
  handleKeyDown();
});

// Increase the page number when clicking show more button
showMoreBtn.addEventListener("click", () => {
  const keyWord = searchInput.value;
  pageNum += 1;
  isShowMore = true;
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

  // See if isShowMore is true or false
  isShowMore
    ? (document.querySelector(".search-results").innerHTML += imageContainer)
    : (document.querySelector(".search-results").innerHTML = imageContainer);
  showMoreBtn.style.display = "block";
}

function handleKeyDown() {
  // Set pageNum to 1 every time a new type of image is searched
  pageNum = 1;
  if (event.key === "Enter") {
    const keyWord = searchInput.value;
    searchImage(keyWord);
  }
}
