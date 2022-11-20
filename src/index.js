// const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const searchFormRef = document.querySelector("form");
// const searchInputRef = document.querySelector("input");
// const searchBtnRef = document.querySelector(".search-button");

const galleryRef = document.querySelector(".gallery");
// const likesRef = document.querySelector(`[data="likes"]`);
// const viewsRef = document.querySelector(`[data="views"]`);
// const commentsRef = document.querySelector(`[data="comments"]`);
// const downloadsRef = document.querySelector(`[data="downloads"]`);

const loadMoreBtnRef = document.querySelector(".load-more");

const MY_KEY = "31431755-1c4852ed09ff5890501267879";

searchFormRef.addEventListener("submit", searchImages);

function searchImages(evt) {
    evt.preventDefault();

fetchImages(evt);
// renderImages();
};

function fetchImages(evt) {
const searchRequest = evt.currentTarget.elements.searchQuery.value;
console.log(searchRequest);
fetch(`https://pixabay.com/api/?key=${MY_KEY}&q=${searchRequest}&image_type=photo$orientation=horizontal&safesearch=true`)
.then(response => response.json())
.then(data => {
    console.log(data.hits[0]);

    if (data.hits.length === 0) {
      galleryRef.innerHTML = "";
      return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
};

    renderImages(data);
})
.catch(er => console.log(er.message))
};

function renderImages(data) {
  galleryRef.innerHTML = "";
  
const markup = data.hits.map(image => 
    `<div class="photo-card">
    <div class="photo-thumb">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="500px"/>
    </div>
    <div class="info">
      <p class="info-item" data="likes">
        <b>Likes</b>${image.likes}
      </p>
      <p class="info-item" data="views">
        <b>Views</b>${image.views}
      </p>
      <p class="info-item" data="comments">
        <b>Comments</b>${image.comments}
      </p>
      <p class="info-item" data="downloads">
        <b>Downloads</b>${image.downloads}
      </p>
    </div>
    </div>`
    )
    .join("");
    console.log(markup);
    galleryRef.innerHTML = markup;
};
