// const debounce = require('lodash.debounce');

const searchFormRef = document.querySelector("form");
const searchInputRef = document.querySelector("input");
const searchBtnRef = document.querySelector(".search-button");

const galleryRef = document.querySelector(".gallery");
const likesRef = document.querySelector(`[data="likes"]`);
const viewsRef = document.querySelector(`[data="views"]`);
const commentsRef = document.querySelector(`[data="comments"]`);
const downloadsRef = document.querySelector(`[data="downloads"]`);

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
.then(data => console.log(data.hits[0]))
};

function renderImages() {

};