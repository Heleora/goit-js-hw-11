import Notiflix from 'notiflix';
import axios from 'axios';

const searchFormRef = document.querySelector("form");
const galleryRef = document.querySelector(".gallery");
const loadMoreBtnRef = document.querySelector(".load-more");

const baseURL = "https://pixabay.com/api/";
const MY_KEY = "31431755-1c4852ed09ff5890501267879";
let page = 1;
const perPage = 40;

searchFormRef.addEventListener("submit", searchImages);
loadMoreBtnRef.addEventListener("click", loadMore);

function searchImages(evt) {
  evt.preventDefault();
  galleryRef.innerHTML = "";
  const searchRequest = evt.currentTarget.elements.searchQuery.value;
  fetchImages(searchRequest);
};

async function fetchImages(searchRequest) {
const response = await axios.get(`${baseURL}?key=${MY_KEY}&per_page=${perPage}&q=${searchRequest}&image_type=photo$orientation=horizontal&safesearch=true`)
.then(response => {
  const data = response.data.hits;
  if (data.length === 0) {
    galleryRef.innerHTML = "";
    return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
};
const totalPermittedImages = response.data.totalHits;
Notiflix.Notify.success(`Hooray! We found ${totalPermittedImages} images.`);
galleryRef.innerHTML = "";

renderImages(data);
loadMoreBtnRef.classList.remove("hidden");
})
};

function renderImages(data) {
  // numberOfRenderImages += perPage;
  // console.log(`отрисовано: ${numberOfRenderImages}`);
  page += 1;
  const markup = data.map(image => 
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

function loadMore(){
  loadMoreBtnRef.classList.add("hidden");
  console.log("Номер страницы:", page);
  };