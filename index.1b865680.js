!function(){var e=document.querySelector("form"),t=(document.querySelector("input"),document.querySelector(".search-button"),document.querySelector(".gallery"),document.querySelector('[data="likes"]'),document.querySelector('[data="views"]'),document.querySelector('[data="comments"]'),document.querySelector('[data="downloads"]'),document.querySelector(".load-more"),"31431755-1c4852ed09ff5890501267879");e.addEventListener("submit",(function(e){e.preventDefault(),function(e){var o=e.currentTarget.elements.searchQuery.value;console.log(o),fetch("https://pixabay.com/api/?key=".concat(t,"&q=").concat(o,"&image_type=photo$orientation=horizontal&safesearch=true")).then((function(e){return e.json()})).then((function(e){return console.log(e.hits[0])}))}(e)}))}();
//# sourceMappingURL=index.1b865680.js.map
