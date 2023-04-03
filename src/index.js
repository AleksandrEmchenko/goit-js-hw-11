import { query } from "./functions/query";
import { renderGallery } from "./functions/render";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
let lightbox = new SimpleLightbox(".gallery a", {
  spinner: true,
  captionsData: "alt",
  captionsDelay: 250,
});

const searchForm = document.querySelector("#search-form");
const galleryEl = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

searchForm.addEventListener("submit", handleSearchImage);
loadMoreBtn.addEventListener("click", handleLoadMoreClickBtn);
loadMoreBtn.classList.add("is-hidden");

let searchQuery = "";
let page = 1;
const per_page = 40;

function handleSearchImage(event) {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  if (!searchQuery) {
    galleryEl.innerHTML = "";
  }

  if (searchQuery) {
    return query(searchQuery).then(({ data }) => {
      // console.log(data);

      if (data.totalHits === 0) {
        Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
        return;
      }
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      renderGallery(data);

      galleryEl.innerHTML = images;
      lightbox.refresh();

      if (data.totalHits <= per_page * page) {
        loadMoreBtn.classList.add("is-hidden");
      } else {
        loadMoreBtn.classList.remove("is-hidden");
      }
    });
  }
}

function handleLoadMoreClickBtn() {
  page += 1;
  return query(searchQuery).then(({ data }) => {
    renderGallery(data);
    galleryEl.insertAdjacentHTML("beforeend", images);
    lightbox.refresh();

    if (data.totalHits > per_page * page) {
      loadMoreBtn.classList.remove("is-hidden");
      lightbox.refresh();
      const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    } else {
      loadMoreBtn.classList.add("is-hidden");
      Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      );
    }
  });
}