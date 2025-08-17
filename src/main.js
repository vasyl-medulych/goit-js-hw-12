import { getImagesByQuery } from './js/pixabay-api';
import {
  checkVisibleLoadBtn,
  clearGallery,
  createGallery,
  hideLoader,
  scrollAfterUpdate,
  showLoader,
  updateGallery,
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
  showLoader();
  currentPage = 1;
  try {
    const images = await getImagesByQuery(query, currentPage);
    hideLoader();
    createGallery(images);
  } catch (error) {
    console.error(error);
  }

  checkVisibleLoadBtn(currentPage);
  // e.target.reset();
});

btnLdMrEl.addEventListener('click', async e => {
  currentPage += 1;
  try {
    const images = await getImagesByQuery(query, currentPage);
    hideLoader();
    updateGallery(images);
  } catch (error) {
    console.error(error);
  }

  scrollAfterUpdate();
  checkVisibleLoadBtn(currentPage);
  // e.target.reset();
});
