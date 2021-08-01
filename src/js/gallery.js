import galleryItems from './gallery-items';
import { refs } from './refs/refs';

console.log(galleryItems);
console.log(refs);

let activeIndex = null;

const markUp = galleryItems.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
    data-source="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
});

// console.log(markUp);

refs.galleryList.insertAdjacentHTML('beforeend', markUp.join(''));

refs.galleryList.addEventListener('click', handleOpenModal);
refs.modal.addEventListener('click', handleCloseModal);
window.addEventListener('keydown', openByEnter);

function handleOpenModal(e) {
  e.preventDefault();

  // if (e.target.nodeName !== 'IMG') {
    if (e.target.classList.contains('gallery__image' || 'gallery__link' )) {
    return;
  }

  markUp.forEach((el, index) => {
    if (el.includes(e.target.dataset.source)) {
      activeIndex = index;
    }
  });

  refs.modal.classList.add('is-open');
  refs.modalImg.src = e.target.dataset.source;

  // window.addEventListener('keydown',  () => keyboardManipulation(e, ));
  window.addEventListener('keydown', keyboardManipulation);

}

function handleCloseModal(e) {
  if (e?.target.nodeName === 'IMG') {
    return;
  }

  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '';

  window.removeEventListener('keydown', keyboardManipulation);
}

function keyboardManipulation({ key }) {
  // console.log(key);

  switch (key) {
    case 'Escape':
      handleCloseModal();
      break;
    case activeIndex < galleryItems.length - 1 && 'ArrowRight':
      activeIndex += 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;

    case activeIndex > 0 && 'ArrowLeft':
      activeIndex -= 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    case activeIndex === galleryItems.length - 1 && 'ArrowRight':
      activeIndex = 0;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;

    case activeIndex === 0 && 'ArrowLeft':
      activeIndex = galleryItems.length - 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;
    default:
      break;
  }
}

function openByEnter(e) {
  if (!e.target.classList.contains('gallery__link') || e.key !== 'Enter') {
    return;
  }

  // refs.modal.classList.add('is-open');
  // refs.modalImg.src = e.target.dataset.source;

  handleOpenModal(e)
  // window.addEventListener('keydown', keyboardManipulation);

}
