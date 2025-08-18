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

const formEl = document.querySelector('.form');
const buttonEl = formEl.querySelector('.submit');
const btnLdMrEl = document.querySelector('.load-more');

let currentPage;
let query;

formEl.addEventListener('input', e => {
  query = e.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    buttonEl.disabled = true;
  } else {
    buttonEl.disabled = false;
  }
});

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.currentTarget.elements['search-text'].value.trim();
  if (e.currentTarget.nodeName == 'BUTTON') return;
  clearGallery();
  hideLoadMoreButton();
  currentPage = 1;
  showLoader(currentPage);

  try {
    const images = await getImagesByQuery(query, currentPage);

    createGallery(images);
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
  scrollAfterUpdate();
  checkVisibleLoadBtn(currentPage);
  formEl.reset();
});
