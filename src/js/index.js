import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from "./pixabayApi.js";

iziToast.settings({
  position: "topRight",
  transitionIn: "flipInX",
  transitionOut: "flipOutX",
  maxWidth: "250px",
});

const form = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

const pageState = {
  page: 1,
  searchParams: "",
  isLoading: false,
  totalItems: 0,
  showItems: 0,
  nextPage() {
    return ++this.page;
  },
  resetState() {
    this.page = 1;
    this.searchParams = "";
    this.totalItems = 0;
    this.showItems = 0;

    gallery.textContent = "";
  },
  updateSearchParams(newParams) {
    this.searchParams = newParams;
  },
  startLoading() {
    loader.classList.remove('visually-hidden');

    this.isLoading = true;
  },
  finishLoading() {
    loader.classList.add('visually-hidden');

    this.isLoading = false;
  },
  addShowItems(itemsCount) {
    this.showItems += itemsCount;
  },
  canShowNextPage() {
    return this.totalItems > this.showItems;
  },
};

const lightbox = new SimpleLightbox(".photo_link");

const handleError = (error) => {
  pageState.finishLoading();

  iziToast.error({ message: error.message });
};

const drawCards = (data) => {
  const markup = data.map((
    {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `
    <div class="photo-card">
      <a class="photo_link" href="${largeImageURL}">
        <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <p>${likes}</p>
        </div>
        <div class="info-item">
          <b>Views</b>
           <p>${views}</p>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <p>${comments}</p>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <p>${downloads}</p>
        </div>
      </div>
    </div>
  `).join("");

  pageState.addShowItems(data.length);

  gallery.insertAdjacentHTML("beforeend", markup);

  lightbox.refresh();
}

const handleSubmit = async (event) => {
  event.preventDefault();

  pageState.resetState();

  const searchValue = event.target.elements.searchQuery.value.trim();

  if (!searchValue) {
    form.reset();

    iziToast.warning({
      message: "Text is required for search images",
    });

    return;
  }

  pageState.updateSearchParams(searchValue);
  pageState.startLoading();

  try {
    const response = await fetchImages(pageState.searchParams, pageState.page);
    const imageData = response.data;

    pageState.totalItems = imageData.totalHits;

    if (!pageState.totalItems) {
      iziToast.warning({
        message: "Sorry, there are no images matching your search query. Please try again.",
      });
    } else {
      iziToast.success({
        message: `Hooray! We found ${pageState.totalItems} images.`,
      });
    }

    drawCards(imageData.hits);

    pageState.finishLoading();

    window.addEventListener("scroll", handleScroll);
  } catch (error) {
    handleError(error);
  }
};

const handleScroll = async () => {
  const isBottomOfPage = window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight;

  if (!(isBottomOfPage && !pageState.isLoading)) {
    return;
  }

  if (!pageState.canShowNextPage()) {
    window.removeEventListener("scroll", handleScroll);

    gallery.insertAdjacentHTML(
      "beforeend",
      "<p>We're sorry, but you've reached the end of search results.</p>",
    );

    return;
  }

  pageState.startLoading();

  try {
    const response = await fetchImages(
      pageState.searchParams,
      pageState.nextPage(),
    );

    drawCards(response.data.hits);

    pageState.finishLoading();

    const { height: cardHeight } = gallery
      .firstElementChild
      .getBoundingClientRect();

    window.scrollBy({ top: cardHeight * 1.5, behavior: "smooth" });
  } catch (error) {
    handleError(error);
  }
};

form.addEventListener("submit", handleSubmit);
