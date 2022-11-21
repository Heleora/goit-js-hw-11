import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const searchFormRef = document.querySelector("form");
const galleryRef = document.querySelector(".gallery");
const loadMoreBtnRef = document.querySelector(".load-more");

const baseURL = "https://pixabay.com/api/";
const MY_KEY = "31431755-1c4852ed09ff5890501267879";
let nextPage = 1;
const perPage = 40;
const totalPages = 500 / perPage;

searchFormRef.addEventListener("submit", searchImages);

function searchImages(evt) {
  evt.preventDefault();
  galleryRef.innerHTML = "";
  nextPage = 1;
  const searchRequest = evt.currentTarget.elements.searchQuery.value;
  fetchImages(searchRequest);
};

async function fetchImages(searchRequest) {
try {
  const response = await axios.get(`${baseURL}?key=${MY_KEY}&per_page=${perPage}&q=${searchRequest}&image_type=photo$orientation=horizontal&safesearch=true`)
.then(response => {
  const data = response.data.hits;
  if (data.length === 0) {
    galleryRef.innerHTML = "";
    loadMoreBtnRef.classList.add("hidden");
    return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
};

const totalPermittedImages = response.data.totalHits;
Notiflix.Notify.success(`Hooray! We found ${totalPermittedImages} images.`);
galleryRef.innerHTML = "";

renderImages(data);
nextPage += 1;
loadMoreBtnRef.classList.remove("hidden");
loadMoreBtnRef.addEventListener("click", loadMore);

const { height: cardHeight } = galleryRef
  .firstElementChild.getBoundingClientRect();
window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
});

let gallery = new SimpleLightbox('.photo-item', { captionsData: "alt", captionDelay: 250 });

async function loadMore(){
  loadMoreBtnRef.classList.add("hidden");
  console.log("Номер следущей страницы:", nextPage);
  if (nextPage > totalPages){
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  };
  
  const additionalResponse = await axios.get(`${baseURL}?key=${MY_KEY}&per_page=${perPage}&q=${searchRequest}&image_type=photo$orientation=horizontal&safesearch=true&page=${nextPage}`)
  .then(additionalResponse => {
    const additionalData = additionalResponse.data.hits;
    renderImages(additionalData);
    loadMoreBtnRef.classList.remove("hidden");
    nextPage += 1;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
  });
    gallery.refresh(); 
    })
  };
})
} catch (er) {
  console.log(er.message);
}
};

function renderImages(data) {
const markup = data.map(image => 
      `<div class="photo-card">
      <div class="photo-thumb">
      <a class="photo-item" href="${image.largeImageURL}">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="500px"/>
      </a>
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
      galleryRef.insertAdjacentHTML("beforeend", markup);
  };

  