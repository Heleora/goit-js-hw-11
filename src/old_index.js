// const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import axios from 'axios';

const searchFormRef = document.querySelector("form");
const galleryRef = document.querySelector(".gallery");
const loadMoreBtnRef = document.querySelector(".load-more");

// loadMoreBtnRef.addEventListener("click", loadMore);

const baseURL = "https://pixabay.com/api/";
const MY_KEY = "31431755-1c4852ed09ff5890501267879";
let page = 1;
const perPage = 40;
let numberOfRenderImages = 0;

searchFormRef.addEventListener("submit", searchImages);

function searchImages(evt) {
    evt.preventDefault();
    galleryRef.innerHTML = "";
    const searchRequest = evt.currentTarget.elements.searchQuery.value;
    fetchImages(searchRequest);
};

function fetchImages(searchRequest) {
fetch(`${baseURL}?key=${MY_KEY}&per_page=${perPage}&q=${searchRequest}&image_type=photo$orientation=horizontal&safesearch=true`)
.then(response => response.json())
.then(data => {

  if (data.hits.length === 0) {
    galleryRef.innerHTML = "";
    return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
};

  const totalPermittedImages = data.totalHits; 
  Notiflix.Notify.success(`Hooray! We found ${totalPermittedImages} images.`);
  galleryRef.innerHTML = "";
      
  renderImages(data);

    const numberOfImagesLeft = totalPermittedImages - numberOfRenderImages;
    console.log(`осталось: ${numberOfImagesLeft}`);

    loadMoreBtnRef.classList.remove("hidden");
    loadMoreBtnRef.addEventListener("click", loadMore);

    function loadMore () {
      page += 1;
      loadMoreBtnRef.classList.add("hidden");
      const numberOfImagesLeft = totalPermittedImages - numberOfRenderImages;

      if(numberOfImagesLeft <= perPage){
        console.log("ПОСЛЕДНЯЯ СТРАНИЦА!!!");
        fetch(`${baseURL}?key=${MY_KEY}&per_page=${numberOfImagesLeft}&q=${searchRequest}&image_type=photo$orientation=horizontal&safesearch=true&page=${page}`)
        .then(response => response.json())
        .then(data => {
        renderImages(data);
        // loadMoreBtnRef.classList.add("hidden");
       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        })
      .catch(er => console.log(er.message))
      };

      if(numberOfImagesLeft > perPage){
        fetch(`${baseURL}?key=${MY_KEY}&per_page=${perPage}&q=${searchRequest}&image_type=photo$orientation=horizontal&safesearch=true&page=${page}`)
      .then(response => response.json())
      .then(data => {
        renderImages(data);
        console.log(numberOfRenderImages);
        const numberOfImagesLeft = totalPermittedImages - numberOfRenderImages;
        console.log(`осталось: ${numberOfImagesLeft}`);
        loadMoreBtnRef.classList.remove("hidden");
      })
      };
      
      };
    })
.catch(er => console.log(er.message))
};

function renderImages(data) {
numberOfRenderImages += perPage;
console.log(`отрисовано: ${numberOfRenderImages}`);

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
    // console.log(markup);
    galleryRef.insertAdjacentHTML("beforeend", markup);
};

