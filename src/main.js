import { getImagesByQuery } from './js/pixabay-api';
import {
  checkVisibleLoadBtn,
  clearGallery,
  createGallery,
  hideLoader,
  scrollAfterUpdate,
  showLoader,
  updateGallery,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const buttonEl = formEl.querySelector('.submit');
const btnLdMrEl = document.querySelector('.load-more');

let currentPage;
let query;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    return iziToast.info({
      message: 'Введіть запит',
      color: 'red',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
    });
  }
  clearGallery();
  hideLoadMoreButton();
  currentPage = 1;
  showLoader(currentPage);

  try {
    const images = await getImagesByQuery(query, currentPage);

    if (images) {
      createGallery(images);
    }
  } catch (error) {
    console.error(error);
  }
  hideLoader();
  checkVisibleLoadBtn(currentPage);
  formEl.reset();
});

btnLdMrEl.addEventListener('click', async e => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader(currentPage);
  try {
    const images = await getImagesByQuery(query, currentPage);
    updateGallery(images);
  } catch (error) {
    console.error(error);
  }
  hideLoader();
  if (images) {
    scrollAfterUpdate();
  }
  checkVisibleLoadBtn(currentPage);
  formEl.reset();
});
