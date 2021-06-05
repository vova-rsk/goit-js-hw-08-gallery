import galleryItems from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
// const button = document.querySelector('.lightbox__button');

/*Формирование разметки галереи*/
const markup = galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
    </a>
    </li>`
}).join('');

gallery.insertAdjacentHTML('afterbegin', markup);

/*Функция-обработчик клика на елемент галереи*/
const onGalleryItemClick = (e) => {
    e.preventDefault();
    
    if (e.target.nodeName !== 'IMG') {
        return;
    }

    openModal();
};

/*Функция-обработчик клика на кнопку закрытия модалки*/
const onButtonClick = (e) => {
    const isCloseButton = e.target.dataset.action === 'close-lightbox';
    
    if (!isCloseButton) {
        return;
    }

    closeModal();
 };

/*Функция открытия модалки*/
const openModal = () => modal.classList.add('is-open');

/*Функция закрытия модалки*/
const closeModal = () => modal.classList.remove('is-open');


gallery.addEventListener('click', onGalleryItemClick);
modal.addEventListener('click', onButtonClick);