import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryCard = document.querySelector('.gallery');

export default function renderImage(data) {
  const card = data.hits
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

  galleryCard.insertAdjacentHTML('beforeend', card);
  galleryEl.refresh();
}

let galleryEl = new SimpleLightbox('.gallery a', {});
galleryEl.on(('show.simplelightbox', function () {}));