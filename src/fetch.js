import axios from 'axios';
import Notiflix from 'notiflix';

const loadMoreBtn = document.querySelector('.load-more');
hideBtnLoadMore();

export default async function fetchInfo(searchValue, pageNumber) {
  const url = `https://pixabay.com/api/`;

  return await axios
    .get(url, {
      params: {
        key: '30296942-4de4307a99055e9d668a05bee',
        q: `${searchValue}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: `${pageNumber}`,
      },
    })

    .then(res => {
      if (res.data.totalHits < 40) {
        hideBtnLoadMore();
      }

      if (!res.data.totalHits) {
        hideBtnLoadMore();
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (pageNumber === 1 && res.data.totalHits > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${res.data.totalHits} images.`
        );
      }

      return res.data;
    });
}

function hideBtnLoadMore() {
  loadMoreBtn.classList.add('visually-hidden');
}
