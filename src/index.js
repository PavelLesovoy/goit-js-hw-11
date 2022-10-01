import './css/styles.scss';
import { Notify } from 'notiflix';
import { pixabayImages } from './fetch';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';


const api = new pixabayImages;
let totlPages = null;

const refs = {
    form: document.getElementById('search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    gallery: document.querySelector('.gallery'),
    btn_load: document.querySelector('.load-more'),
}

hideBtnLoadMore();

refs.form.addEventListener('submit', onSearchImage);
refs.btn_load.addEventListener('click', onLoadMore);

function onSearchImage(event) {
    event.preventDefault();

    api.searchQuery = refs.input.value;
    api.resetPage();
    hideBtnLoadMore();
    clearGallery();

    api.fetchImages()
    .then(arrayImages => {
        if (arrayImages.length === 0) {
            showNotifyMessage();
            return;
        }
        

        showQuantityImages(api.totalImages);
        renderMarkup(arrayImages);
        addSimpleLightBox();
        showBtnLoadMore();
        smoothScroll();

        totlPages = api.totalImages / 40;
        if(api.page > totlPages) {
            showMassageInEndImages();
        }
    })
    .catch(error => console.log(error));
}


function onLoadMore() {
    api.fetchImages()
    .then(arrayImages => {
        renderMarkup(arrayImages);
        addSimpleLightBox();
        smoothScroll();

        totlPages = api.totalImages / 40;
        if(api.page > totlPages) {
            showMassageInEndImages();
        }
    });
}

function renderMarkup(images) {
    const imageCard = images
    .map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="220" height="170" />
      </a>
      <div class="info">
        <p class="info-item">
        Likes <br/>
          <b>${likes}</b>
        </p>
        <p class="info-item">
        Views <br/>
          <b>${views}</b>
        </p>
        <p class="info-item">
        Comments <br/>
          <b>${comments}</b>
        </p>
        <p class="info-item last_item">
        Downloads <br/>
          <b>${downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');

    refs.gallery.insertAdjacentHTML('beforeend',imageCard);
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function showNotifyMessage() {
    Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

function hideBtnLoadMore() {
    refs.btn_load.classList.add('visually-hidden');
}

function showBtnLoadMore() {
    refs.btn_load.classList.remove('visually-hidden');
}

function showMassageInEndImages() {
    hideBtnLoadMore();
    Notify.warning("We're sorry, but you've reached the end of search results.");
}

function showQuantityImages(quantityImages) {
    Notify.success(`Hooray! We found ${quantityImages} images.`);
}

// function showErrorMassage() {
//     Notify.error("Oops, something went wrong. Pllease try again");
// }

function addSimpleLightBox() {
    let galleryLightBox = new SimpleLightbox(".gallery a", {
        captionsData: "alt",
        captionPosition: "bottom",
        captionDelay: 250,
    });
    galleryLightBox.refresh();
}

function smoothScroll() {
    const { height: cardHeight } = document.querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

